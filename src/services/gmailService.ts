import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

export const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));

// In-memory token cache only (never persisted to localStorage or sessionStorage)
let isSigningIn = false;
let cachedAccessToken: string | null = null;

export interface InquiryEmailPayload {
  fullName: string;
  email: string;
  phone: string;
  serviceName: string;
  message: string;
}

export const initGmailAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess?.(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        onAuthFailure?.();
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure?.();
    }
  });
};

export const googleSignInForGmail = async (): Promise<{
  user: User;
  accessToken: string;
}> => {
  try {
    isSigningIn = true;
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve Gmail access permission from Google.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
};

export const getGmailAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const clearCachedGmailToken = () => {
  cachedAccessToken = null;
};

export const logoutGmailAuth = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function encodeBase64Url(str: string): string {
  return utf8ToBase64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export class GmailAuthExpiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GmailAuthExpiredError';
  }
}

export const sendInquiryViaGmail = async (
  accessToken: string,
  payload: InquiryEmailPayload
): Promise<{ id: string }> => {
  const recipient = 'info@pianoip.com';
  const subjectText = `Consultation Inquiry: ${payload.serviceName} — ${payload.fullName}`;
  const encodedSubject = `=?UTF-8?B?${utf8ToBase64(subjectText)}?=`;

  const cleanFullName = payload.fullName.replace(/[\r\n]/g, ' ').trim();
  const cleanReplyTo = payload.email.replace(/[\r\n]/g, '').trim();

  const bodyLines = [
    'New IP Advisory Brief submitted via pianoIP website:',
    '',
    `Full Name: ${cleanFullName}`,
    `Email Address: ${cleanReplyTo}`,
    `Phone Number: ${payload.phone.trim() || 'Not provided'}`,
    `Service Interested In: ${payload.serviceName}`,
    '',
    'Message & Invention Context:',
    payload.message.trim(),
    '',
    '-- Dispatched via pianoIP Official Website Portal',
  ];

  const mimeMessage = [
    `To: ${recipient}`,
    `Reply-To: ${cleanFullName} <${cleanReplyTo}>`,
    `Subject: ${encodedSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
    '',
    bodyLines.join('\r\n'),
  ].join('\r\n');

  const raw = encodeBase64Url(mimeMessage);

  const response = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    }
  );

  if (response.status === 401 || response.status === 403) {
    clearCachedGmailToken();
    throw new GmailAuthExpiredError(
      'Your Google Gmail session expired or lacks send permission. Please sign in with Google again.'
    );
  }

  if (!response.ok) {
    let errorDetail = `Gmail delivery failed (HTTP ${response.status}).`;
    try {
      const errJson = await response.json();
      if (errJson?.error?.message) {
        errorDetail = errJson.error.message;
      }
    } catch {
      // Ignore JSON parse failure
    }
    throw new Error(errorDetail);
  }

  return response.json();
};

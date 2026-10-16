// reCAPTCHA v3: the script is loaded with the site key and returns a scored token per action.
// https://developers.google.com/recaptcha/docs/v3

// Action name sent with the contact form token; the API checks it matches
export const RECAPTCHA_CONTACT_ACTION = 'contact';

type ReCaptchaV3 = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: ReCaptchaV3;
  }
}

let loadingScript: Promise<ReCaptchaV3> | null = null;

export function loadRecaptcha(siteKey: string): Promise<ReCaptchaV3> {
  if (!loadingScript) {
    loadingScript = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.onload = () => {
        const grecaptcha = window.grecaptcha;
        if (!grecaptcha) {
          reject(new Error('reCAPTCHA failed to initialise'));
          return;
        }
        grecaptcha.ready(() => resolve(grecaptcha));
      };
      script.onerror = () => {
        loadingScript = null; // allow a retry on the next submit
        reject(new Error('reCAPTCHA failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return loadingScript;
}

export async function getRecaptchaToken(siteKey: string, action: string): Promise<string> {
  const grecaptcha = await loadRecaptcha(siteKey);
  return grecaptcha.execute(siteKey, { action });
}

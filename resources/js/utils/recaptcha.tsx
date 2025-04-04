// utils/recaptcha.ts
declare global {
    interface Window {
        grecaptcha: any;
    }
}

let recaptchaLoaded = false;
let loadPromise: Promise<void> | null = null;

export const loadRecaptcha = (siteKey: string) => {
    if (recaptchaLoaded) return Promise.resolve();
    if (loadPromise) return loadPromise;

    loadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            window.grecaptcha.ready(() => {
                recaptchaLoaded = true;
                resolve();
            });
        };
        script.onerror = (error) => {
            console.error('reCAPTCHA failed to load:', error);
            reject(new Error('reCAPTCHA failed to load'));
        };

        document.body.appendChild(script);
    });

    return loadPromise;
};
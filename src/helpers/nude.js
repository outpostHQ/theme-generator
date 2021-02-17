export default function requireNude() {
  if (typeof window === 'undefined') return new Promise(() => {});

  if (window.Nude) {
    return Promise.resolve(window.Nude);
  } else {
    return new Promise((resolve) => {
      window.addEventListener('nudeReady', () => {
        resolve(window.Nude);
      });
    });
  }
}

// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Supabase internally fires AbortErrors during React 18 Strict Mode's
// double-invoke cycle. These are harmless but show as uncaught promise
// rejections since they originate inside the library's own fetch calls.
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const isAbort =
    reason?.name === 'AbortError' ||
    reason?.message?.includes('AbortError') ||
    reason?.message?.includes('signal is aborted');

  if (isAbort) {
    event.preventDefault(); // suppresses the console error
    return;
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
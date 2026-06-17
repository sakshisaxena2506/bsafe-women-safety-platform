import { useEffect, useState } from "react";

export default function CountdownTimer({ isRunning, seconds = 5, onComplete }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (!isRunning) {
      setRemaining(seconds);
      return undefined;
    }

    if (remaining <= 0) {
      onComplete();
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setRemaining((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [isRunning, onComplete, remaining, seconds]);

  return (
    <div className="grid place-items-center rounded-2xl bg-roseguard-50 p-6 text-center dark:bg-roseguard-500/10">
      <span className="text-sm font-bold text-roseguard-700 dark:text-roseguard-100">Sending SOS in</span>
      <strong className="mt-2 text-6xl font-extrabold text-roseguard-600">{remaining}</strong>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Your alert will include live location and trusted contacts.
      </p>
    </div>
  );
}

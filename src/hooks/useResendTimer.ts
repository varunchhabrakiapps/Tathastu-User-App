import { useCallback, useEffect, useState } from 'react';

/**
 * Countdown from `initialSeconds` to zero, one tick per second.
 * Scheduling only — no resend rules or API coupling.
 */
export function useResendTimer(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return undefined;
    }
    const id = setTimeout(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const restart = useCallback(
    (seconds: number = initialSeconds) => {
      setSecondsLeft(seconds);
    },
    [initialSeconds],
  );

  const clear = useCallback(() => {
    setSecondsLeft(0);
  }, []);

  return {
    secondsLeft,
    restart,
    clear,
    isFinished: secondsLeft <= 0,
  };
}

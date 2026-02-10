import { useEffect, useState } from "react";

type Props = {
  message: string;
  onDone: () => void;
};

const ErrorNotification = ({ message, onDone }: Props) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => {
      setLeaving(true);
    }, 3000);

    const cleanupTimer = setTimeout(() => {
      onDone();
    }, 3400);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(cleanupTimer);
    };
  }, [onDone]);

  return (
    <div
      role="alert"
      className={`
        bg-red-100 border border-red-400 text-red-700 px-2 py-1.5 rounded
        dark:bg-red-200 dark:border-red-500 dark:text-red-800

        transform transition-all duration-300 ease-in-out
        ${leaving ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}
      `}
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorNotification;

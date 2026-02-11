// user-client/src/components/ErrorNotification.tsx
import React, { useEffect, useState } from "react";
import type { FormError } from "../types/formError";

type Props = {
  id: string;
  message: string;
  setFormErrors: React.Dispatch<React.SetStateAction<FormError[]>>;
};

const ErrorNotification = ({ id, message, setFormErrors }: Props) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => {
      setLeaving(true);
    }, 3000);

    const cleanupTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        setFormErrors(prev => prev.filter(err => err.id !== id));
      });
    }, 3000 + 200);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

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

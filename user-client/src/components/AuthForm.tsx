import type { FormEvent, ReactNode } from 'react';

type AuthFormProps = {
  action: string;
  method: 'POST' | 'GET';
  title: string;
  visible: boolean;
  switchTo: 'login' | 'signup';
  sideText: string;
  sideButtonText: string;
  setIsLogin: (isLogin: boolean) => void;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;

  reversed?: boolean;
  children?: ReactNode;
};

const AuthForm = ({
  action,
  method = 'POST',
  title,
  reversed = false,
  visible,
  switchTo,
  setIsLogin,
  handleSubmit,
  children,
  sideText,
  sideButtonText
} : AuthFormProps) => {
  
  return (
    <div
      className={`
        flex flex-col w-full h-full absolute
        ${visible ? '' : 'hidden'}
        bg-gray-100
        dark:bg-gray-800 dark:text-white
        ${reversed ? 'xl:flex-row-reverse' : 'xl:flex-row'}
      `}
    >
      <form 
        data-action={action}
        method={method}
        onSubmit={handleSubmit}
        className={`
          flex flex-col gap-4 justify-center items-center
          grow px-8 py-6
          xl:grow-0 xl:shrink-0 xl:basis-1/2
        `}
      >
        <h2 className='font-bold text-3xl'>{title}</h2>

        {children}

        <button
          className='
            px-4 py-2 rounded
            hover:bg-blue-600 dark:hover:bg-blue-700
            bg-blue-500 text-white
            dark:bg-blue-600
          '
        >
          Submit
        </button>
      </form>
      <div
        className={`
          shrink mb-8 px-8 py-6
          gap-4 justify-center items-center
          bg-linear-to-tl inline text-center
          
          xl:mb-0 xl:flex xl:flex-col xl:grow-0 xl:shrink-0 xl:basis-1/2
          xl:from-red-400 xl:via-red-500 xl:to-red-600 xl:text-gray-100
          xl:dark:from-red-700 xl:dark:via-red-800  xl:dark:to-red-900 xl:dark:text-white
        `}
      >
        <p
          className='font-bold text-center text-2xl inline'
        >
          {sideText}
        </p>
        <button
          className='
            px-4 py-2 cursor-pointer xl:border-2 rounded transition-colors underline
            xl:border-white xl:no-underline
            xl:hover:bg-white xl:hover:text-red-600
            xl:dark:hover:bg-gray-200 xl:dark:hover:text-red-800
          '
          onClick={() => setIsLogin(switchTo === 'login')}
        >
          {sideButtonText}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
import { useState } from "react";
import FormGroup from "../components/FormGroup";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";
import type { FormEvent } from "react";
import { useAuth } from "../context/auth/useAuth";
import { authApi } from "../api/auth.api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (form.dataset.action === undefined) {
      console.error('Form action is not defined');
      return;
    }

    try {
      const response = isLogin
        ? await authApi.login(data)
        : await authApi.signup(data);

      if ('error' in response) {
        console.error(response.error);
        return;
      }

      login(response);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <main
        className={`
          flex flex-col min-h-[calc(100vh-4rem)]
          box-border
          px-4 py-32
          xl:px-48 xl:py-12
          dark:bg-gray-900
        `}
      >
        <div
          className={`
            relative grow h-full w-full rounded-xl overflow-hidden
            border border-gray-300
            dark:border-gray-600
            shadow-lg dark:shadow-gray-800
          `}
        >
          <AuthForm
            action='auth/login'
            method='POST'
            title='Login'
            visible={isLogin}
            switchTo='signup'
            setIsLogin={setIsLogin}
            handleSubmit={handleSubmit}
            sideText="Don't have an account?"
            sideButtonText="Sign Up"
            
          >
            <FormGroup
              id='login-username'
              label='Username'
              name='username'
            />
            <FormGroup
              id='login-password'
              label='Password'
              type='password'
              name='password'
            />
          </AuthForm>



          <AuthForm
            action='auth/signup'
            method='POST'
            title='Sign Up'
            reversed={true}
            visible={!isLogin}
            switchTo='login'
            setIsLogin={setIsLogin}
            handleSubmit={handleSubmit}
            sideText='Already have an account?'
            sideButtonText='Login'
          >
            <FormGroup
              id='signup-username'
              label='Username'
              name='username'
            />
            <FormGroup
              id='signup-password'
              label='Password'
              type='password'
              name='password'
            />
            <FormGroup
              id='confirm-password'
              label='Confirm Password'
              type='password'
              name='confirmPassword'
            />
          </AuthForm>
        </div>
      </main>
    </>
  );
};

export default Auth;
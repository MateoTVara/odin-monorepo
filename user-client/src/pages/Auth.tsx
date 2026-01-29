import { useState } from "react";
import FormGroup from "../components/FormGroup";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/auth/useAuth";
import type { FormEvent } from "react";
import type { AuthError, AuthResponse } from "../types/authResponse";

const Auth = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const authResponse: (AuthResponse | AuthError) = await response.json();
      if ('error' in authResponse) {
        console.error('Authentication error:', authResponse.error);
      } else {
        login(authResponse);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <>
      <Header />
      <main
        className={`
          flex flex-col h-screen
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
            action='http://localhost:3000/auth/login'
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
            action='http://localhost:3000/auth/signup'
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
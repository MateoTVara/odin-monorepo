import { useAuth } from "../context/auth/useAuth";
import { env } from "../config/env";
import { apiFetchJson } from "../lib/apiFetch";
import type { AuthResponse } from "../types/authResponse";
import type { SubmitEventHandler } from "react";
import Header from "../components/Header";

const Login = () => {
  const { login } = useAuth();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const response = await apiFetchJson<AuthResponse | { error: string }>('auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if ('error' in response) {
      console.error(response.error);
      return;
    }

    login(response);

    window.location.href = '/';
  }

  return (
    <>
      <Header />
      <div>
        <form action={`${env.ApiBaseUrl}/auth/login`} method="POST" onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
          </div>
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  )

}

export default Login;
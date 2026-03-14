import { useAuth } from "../context/auth/useAuth";
import { apiFetchJson } from "../lib/apiFetch";
import type { AuthResponse } from "../types/authResponse";
import type { SubmitEventHandler } from "react";
import Header from "../components/Header";

const Login = () => {
  const { login } = useAuth();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const response = await apiFetchJson<AuthResponse | { error: string }>(
      "auth/admin/login",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if ("error" in response) {
      console.error(response.error);
      return;
    }

    login(response);
    window.location.href = "/";
  };

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-72px)] bg-gray-100 flex items-center justify-center px-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 flex flex-col gap-5"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-sm text-gray-600">Sign in to access the dashboard.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              required
              autoComplete="username"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;
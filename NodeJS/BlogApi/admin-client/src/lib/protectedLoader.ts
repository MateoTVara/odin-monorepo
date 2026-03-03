import { redirect } from "react-router";

export const protectedLoader = () => {
  const token = localStorage.getItem("authUser")

  if (!token) {
    return redirect("auth/login")
  }

  return null;
}
import type { ReactNode } from "react";
import AuthProvider from "./auth/AuthProvider";

const AppProviders = ({children}: {children: ReactNode}) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default AppProviders;
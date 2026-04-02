import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Root() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
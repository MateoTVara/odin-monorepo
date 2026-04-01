import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Root() {
  return (
    <div className="bg-zinc-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
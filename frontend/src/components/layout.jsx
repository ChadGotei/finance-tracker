import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";
import MobileNav from "./MobileNav";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-row bg-[#1b1b1b]">
      {/* nav bar for pc*/}
      <NavBar />
      {/* Nav bar for mobile view */}
      <MobileNav />

      {/* other content the <main> thingy */}
      <div className="flex-grow container p-4 bg-[#0b0b0b] mx-6 mt-10 mb-8 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

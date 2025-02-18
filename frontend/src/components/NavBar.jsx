import { Link } from "react-router-dom";
import User from "./User";
import { navLinks } from "@/constants";
import { useState } from "react";
import Logo from "./Logo";

const NavBar = () => {
  const [active, setActive] = useState("");

  return (
    <>
    {/* PC VIEW */}
      <div className="sm:flex flex-col justify-between px-3 py-4 hidden">
        <User />
        <ul className="flex flex-col gap-4 ml-2">
          {navLinks.map((link) => (
            <NavCard
              key={link.id}
              {...link}
              isActive={active === link.link}
              setActive={setActive}
            />
          ))}
        </ul>
        <Logo />
      </div>
    </>
  );
};

const NavCard = ({ name, link, icon: Icon, isActive, setActive }) => {
  return (
    <Link
      to={link}
      onClick={() => setActive(link)}
      className={`group flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors 
        ${
          isActive
            ? "bg-grey-1 border-grey-2 text-cyan"
            : "border-transparent text-[#cee8e5] hover:bg-grey-1 hover:border-grey-2 hover:text-cyan"
        }
      `}
    >
      <Icon
        className={`w-6 h-6 transition-colors ${
          isActive ? "text-cyan" : "text-[#cee8e5] group-hover:text-cyan"
        }`}
      />
      <span className="font-semibold transition-colors">{name}</span>
    </Link>
  );
};

export default NavBar;

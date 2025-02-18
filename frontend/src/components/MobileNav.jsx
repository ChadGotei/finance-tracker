import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/constants";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary p-4 fixed top-0 w-full z-50 block sm:hidden">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-cyan text-2xl font-bold">
          FinTracker
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-40">
          <ul className="mt-4 p-4 rounded-lg flex flex-col gap-3 shadow-lg backdrop-blur-md">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.link}
                  className=" text-white p-2 rounded-lg hover:bg-grey-2 hover:text-cyan transition-colors flex flex-row gap-6"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon 
                    className="w-6 h-6"
                  />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;

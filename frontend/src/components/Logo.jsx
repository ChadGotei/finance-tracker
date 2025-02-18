import { FinTracker, logo } from "@/assets";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="w-full flex items-center justify-center cursor-pointer mb-6">
      <Link to={"/"}>
        <img src={FinTracker} height={200} width={200} />
      </Link>
    </div>
  );
};

export default Logo;

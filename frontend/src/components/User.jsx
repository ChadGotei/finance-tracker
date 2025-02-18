// import logo from '../../public/logo.png';
import { user } from "@/assets";
import { Link } from "react-router-dom";

// I am either going to make it like that ki it shows the logo and the name of the app or im goin to make it like a user? like the name and pfp can be changed something like that z
const User = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-white">
      {/* User image */}
      <Link to={"/user"}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
          <img src={user} alt="User Logo" className="w-20 h-20 object-cover" />
        </div>

        {/* User Name */}
        <div className="mt-2 text-lg font-semibold">Anonymous</div>
      </Link>
    </div>
  );
};

export default User;

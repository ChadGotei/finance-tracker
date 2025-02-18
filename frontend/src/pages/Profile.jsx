import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center items-center bg-grey-2 h-[100vh] flex-col gap-6">
      <h2 className="text-4xl text-cyan font-semibold">User Profile: WIP</h2>
      <Button
        size="lg"
        variant="outline"
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
};

export default Profile;

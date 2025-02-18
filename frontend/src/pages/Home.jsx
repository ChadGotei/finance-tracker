import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-5xl font-bold text-white/90 tracking-wide mb-6">
        Dashboard
      </h2>
      <hr className="border-grey-2 sm:mb-20 mb-32" />
      <div className="flex justify-center items-center h-[40dvh]">

        {/* Dialog box */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="cursor-pointer bg-cyan text-grey-2 hover:text-cyan hover:bg-grey-2 hover:border-[1px] hover:border-grey-2 transition-colors hover:shadow-md hover:shadow-cyan shadow-grey-1 shadow-lg"
              size="lg"
              onClick={() => setOpen(true)}
            >
              Get started
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dashboard</DialogTitle>
              <hr className="border-grey-2 mb-4 mt-1" />
              <DialogDescription>
                Sorry for the inconvenience, but the <span className="font-semibold">Dashboard</span> is not yet ready for production.
              </DialogDescription>

              <Button
                className="sm:mt-4 mt-1 mb-0 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/App";
import { toastError, toastSuccess } from "@/lib/toastFn";
import { categoriesList } from "@/constants";

const SetBudget = () => {
  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-5xl font-bold text-white/90 tracking-wide mb-6">
        Set Budget
      </h2>
      <hr className="border-grey-2 sm:mb-14 mb-32 w-full max-w-3xl" />

      <div className="w-full max-w-3xl flex justify-center flex-col items-center">
        {categoriesList.map((category) => (
          <BudgetField key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

const BudgetField = ({ category }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || Number(newValue) >= 1) {
      setValue(newValue);
    }
  };

  function changeSet() {
    if(!value) {
        toastError("Please provide value", true);
        return;
    }
    api
      .put(
        `/category/${
          category.id.charAt(0).toUpperCase() + category.id.slice(1)
        }`,
        {
          budget: Number(value),
        }
      )
      .then(() => { 
        toastSuccess(`Budget set for ${category.name}!`);
      })
      .catch((error) => {
        console.error("Error setting budget", error);
        toastError(error);
      });
  }

  return (
    <div className="flex flex-row gap-4 items-center mb-4">
      <div className="text-white text-lg font-semibold min-w-[120px]">
        {category.name}
      </div>
      <Input
        type="number"
        min={1}
        className="bg-grey-1 text-white border-grey-2 hover:border-white/50 w-full 
        sm:w-[30%] md:w-[12rem]"
        value={value}
        onChange={handleChange}
      />
      <Button
        onClick={changeSet}
        className="w-[50%] hover:bg-cyan hover:text-primary font-semibold cursor-pointer bg-primary text-cyan transition-colors"
      >
        Set
      </Button>
    </div>
  );
};

export default SetBudget;

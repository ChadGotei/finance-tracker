import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

const BudgetInput = ({ name }) => {
  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem className="w-[50%]">
          <FormLabel className="text-white/80 text-lg">
            {name[0].uppercase + name.trim()}
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              min={1}
              className="bg-grey-1 text-white border-grey-2 hover:border-white/50 w-full"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BudgetInput;

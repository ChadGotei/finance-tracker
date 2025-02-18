// this contains everything related to our creaitng new transaction, its done using react hook form along with shadcn form then used axios to post the content to our mongodb database!
import formSchema from "@/lib/transactionValidation";

import { api } from "@/App";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toastError, toastSuccess } from "@/lib/toastFn";

const NewTransaction = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Misc",
      notes: "",
      date: new Date().toISOString().split("T")[0],
      amount: 1,
    },
  });

  function onSubmit(values) {
    form.reset();

    api
      .post("/transaction", {
        ...values,
        amount: Number(values.amount),
      })
      .then((response) => {
        console.log("Transaction added:", response.data);
        toastSuccess("Transaction created successfully!");
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
        toastError(error);
      });
  }

  function onReset() {
    try {
      form.reset();
      toastSuccess("Form has been reset")
    } catch (e) {
      toastError(e);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl sm:text-5xl font-bold text-white/90 tracking-wide mb-6 text-center mt-10 sm:mt-1">
        Create Transaction
      </h2>
      <hr className="border-grey-2 mb-6" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[100%] sm:w-[70%] md:w-[50%]">
                <FormLabel className="text-white/80 text-lg">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Transaction name"
                    className="bg-grey-1 text-white border-grey-2 hover:border-white/50 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-[100%] sm:w-[70%] md:w-[50%]">
                <FormLabel className="text-white/80 text-lg">
                  Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-grey-1 text-white border-grey-2 hover:border-white/50 w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-grey-2 text-white">
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Bills">Bills</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Misc">Misc</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-[100%] sm:w-[70%] md:w-[50%]">
                <FormLabel className="text-white/80 text-lg">Amount</FormLabel>
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

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-[100%] sm:w-[70%] md:w-[50%]">
                <FormLabel className="text-white/80 text-lg">Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="bg-grey-1 text-white border-grey-2 hover:border-white/50 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="w-[100%] sm:w-[70%] md:w-[50%]">
                <FormLabel className="text-white/80 text-lg">Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional details..."
                    className="bg-grey-1 text-white border-grey-2 hover:border-white/50 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="submit"
              className="w-[50%] bg-cyan text-primary font-semibold cursor-pointer hover:bg-primary hover:text-cyan transition-colors"
            >
              Submit
            </Button>
            <Button
              type="reset"
              onClick={onReset}
              className="w-[50%] bg-primary text-cyan font-semibold cursor-pointer hover:bg-cyan hover:text-primary transition-colors"
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewTransaction;

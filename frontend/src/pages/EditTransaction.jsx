import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { LoaderCircle } from "lucide-react";
import { editFormSchema } from "@/lib/transactionValidation";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/App";
import { toastError, toastSuccess } from "@/lib/toastFn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditTransaction = () => {
  const { id } = useParams();
  const [tran, setTran] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name: "",
      category: "Misc",
      notes: "",
      date: new Date(),
      amount: 69,
    },
  });

  useEffect(() => {
    setLoading(true);
    api
      .get(`/transaction/${id}`)
      .then((response) => {
        if (!response.data?.data) throw new Error("Transaction not found");

        const transactionData = response.data.data;

        // date formatting stuff
        transactionData.date = new Date(transactionData.date)
          .toISOString()
          .split("T")[0];

        setTran(transactionData);
        form.reset(transactionData);
      })
      .catch((error) => {
        console.error("Error fetching transaction:", error);
        toastError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function onSubmit(values) {
    api
      .put(`transaction/${id}`, {
        ...values,
        amount: Number(values.amount),
      })
      .then((response) => {
        toastSuccess("Transaction edited!");
        navigate("/view");
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
        toastError(error);
      });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-5xl font-bold text-white/90 tracking-wide mb-6 text-center">
        Edit transaction
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
              <FormItem className="w-[50%]">
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
              <FormItem className="w-[50%]">
                <FormLabel className="text-white/80 text-lg">
                  Category
                </FormLabel>
                <Select
                  value={field.value}  
                  onValueChange={field.onChange}
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
              <FormItem className="w-[50%]">
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
              <FormItem className="w-[50%]">
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
              <FormItem className="w-[50%]">
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

          <Button
            type="submit"
            className="w-[50%] bg-cyan text-primary font-semibold cursor-pointer hover:bg-primary hover:text-cyan transition-colors"
          >
            {loading ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditTransaction;

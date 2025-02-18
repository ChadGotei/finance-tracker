import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Category is required." }),
  amount: z.string().min(1, {message: "Amount should be at least 1"}),
  date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date format.",
  }),
  notes: z.string().optional(),
});

export const editFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Category is required." }),
  amount: z.number().min(1, { message: "Amount must be greater than 0." }),
  date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date format.",
  }),
  notes: z.string().optional(),
});

export default formSchema;

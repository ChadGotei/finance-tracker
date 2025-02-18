import mongoose from "mongoose";
import Category from "./category.model.js";

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: 2,
    maxLength: 50,
  },
  category: {
    type: String,
    enum: [   
      "Food",
      "Transport",
      "Shopping",
      "Health",
      "Entertainment",    
      "Bills",
      "Education",
      "Groceries",
      "Travel",
      "Savings",
      "Rent",
      "Misc",
    ],
    required: [true, "Please provide a category"],
  },
  amount: {
    type: Number,
    required: [true, "Please enter the amount"],
    min: [0, "Amount must be greater than 0"],
  },
  notes: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: [true, "Please provide the purchased date"],
    default: Date.now,
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);
export default Transaction;

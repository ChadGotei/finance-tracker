import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  budget: {
    type: Number,
    required: true,
    min: 0,
  },
  transactions: [
    {  
      // required: [true, 'Transaction id is required'],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  totalExpense: {
    type: Number,
  },
});

categorySchema.path('transactions').validate(function(value) {
  return value && value.length > 0;  
}, 'At least one transaction is required.');


const Category = mongoose.model("Category", categorySchema);
export default Category;

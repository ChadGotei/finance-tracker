import Category from "../models/category.model.js";
import Transaction from "../models/transaction.model.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (e) {
    console.error(e);
  }
};

export const createCategory = async (req, res) => {
  try {
    const data = req.body;
    const tranId = req.body.transactions[0];

    const transaction = await Transaction.findById(tranId);

    if (!transaction)
      return res.status(403).json({ message: "Provide valid transaction id" });
    const category = await Category.create(data);

    if (!category)
      return res.status(403).json({
        success: false,
        message: "Error occurred while creating data.",
      });

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (e) {
    console.error(e);
  }
};

export const editCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const updatedData = req.body;

    // console.log("Updating category:", name, "with data:", updatedData);

    const category = await Category.findOneAndUpdate(
      { name },
      { $set: updatedData }, // using $set since we are settins specific field only
      { new: true }
    );

    if (!category) return res.status(404).json({ error: "Category not found" });

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBudget = async (req, res) => {
  try {
    const { name } = req.params;

    const category = await Category.findOne(
      { name },
      { budget: 1 } 
    );

    if (!category) return res.status(404).json({ error: "Category not found" });

    return res.status(200).json({
      success: true,
      data: category.budget, 
    });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

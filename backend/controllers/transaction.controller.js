import Category from "../models/category.model.js";
import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";

export const getTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            data: transactions
        });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getTransactionById = async (req, res) => {
    try {
        const id = req.params.id;
        const transaction = await Transaction.findById(id);

        if (!transaction) return res.status(404).json({ error: "Transaction not found" });

        return res.status(200).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const editTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const transaction = await Transaction.findByIdAndUpdate(id, updatedData, { new: true });

        if (!transaction) return res.status(404).json({ error: "Transaction not found" });

        return res.status(200).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) return res.status(404).json({ error: "Transaction not found" });

        const relatedCategory = transaction.category;
        const category = await Category.findOneAndUpdate(
            { name: relatedCategory },
            { $pull: { transactions: new mongoose.Types.ObjectId(id) } }, 
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Transaction deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


export const createTransaction = async (req, res) => {
    try {
        const data = req.body;
        const transaction = await Transaction.create(data);

        if (!transaction) throw new Error("Internal server error");

        const relatedCategory = transaction.category;
        const category = await Category.findOne({ name: relatedCategory });

        if (category) {
            category.transactions.push(transaction._id);
            await category.save();
        }

        res.status(201).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};


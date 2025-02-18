import { Router } from "express";
import { createTransaction, deleteTransaction, editTransaction, getTransaction, getTransactionById } from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter
    .route('/')
    .get(getTransaction)
    .post(createTransaction)

transactionRouter
    .route('/:id')
    .get(getTransactionById)
    .put(editTransaction)
    .delete(deleteTransaction)

export default transactionRouter; 
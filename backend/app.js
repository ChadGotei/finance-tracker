import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToDatabase from "./database/mongodb.js";
import { PORT, FRONTEND_URL } from "./config/env.js";

import categoryRoutes from "./routes/category.routes.js";
import TransactionRouter from "./routes/transaction.routes.js";

const app = express();

// third party middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// Middlewares created
app.use("/api/transaction", TransactionRouter);
app.use("/api/category", categoryRoutes);

app.listen(PORT, async () => {
  console.log(`App running on localhost:${PORT}`);

  await connectToDatabase();
});

export default app;

import { Router } from "express";
import { createCategory, editCategory, getCategories } from "../controllers/category.controllers.js";

const categoryRoutes = Router();

categoryRoutes
    .route('/')
    .get(getCategories)
    .post(createCategory)
categoryRoutes
    .route('/:name')
    .put(editCategory)

export default categoryRoutes;
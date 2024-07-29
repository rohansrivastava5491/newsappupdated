import express from "express";
import {Router} from "express";
import { articleController, saveArticleController, getSavedArticleController, deleteArticleController } from "../../controllers/news.js";
import { verifyToken } from "../../controllers/auth.js";
const router = Router();
router.use(express.json())
router.get('/sortBy:sortBy/from:from/to:to/querry:querry', verifyToken , articleController);
router.post('/articles/:userId', verifyToken , saveArticleController);
router.get('/articles/:userId', verifyToken , getSavedArticleController);
router.delete('/articles/:userId/:articleId', verifyToken , deleteArticleController);

export default router;
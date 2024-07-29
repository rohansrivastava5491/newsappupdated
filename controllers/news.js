import axios from "axios";
import User from '../models/users.js'
export const articleController = async(req,res) => {
    try {
        const {sortBy,querry,from,to}=req.params;
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${querry}}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=467644902f224dbc96571ff90a423677`)

    return res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
   
}
export const deleteArticleController = async(req,res) => {
    const userId = req.params.userId;
    const articleId = req.params.articleId;

    try {
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the article exists in the user's articles array
        const articleIndex = user.articles.findIndex(article => article._id.toString() === articleId);

        if (articleIndex === -1) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Remove the article from the user's articles array
        user.articles.splice(articleIndex, 1);

        // Save the updated user object
        await user.save();

        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}
export const saveArticleController = async(req,res) => {
    const userId = req.params.userId;
    try{   
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
console.log(req);
   // Extract article data from the request body
   const { articleName, articleText, articleSource, articleImage, articleLink } = req.body;

   // Create a new article object
   const newArticle = {
       articleName,
       articleText,
       articleSource,
       articleImage,
       articleLink
   };

   // Add the new article to the user's articles array
   user.articles.push(newArticle);

   // Save the user object with the new article
   await user.save();

   res.status(201).json({ message: 'Article created successfully', article: newArticle });
} catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Server Error' });
}
}
export const getSavedArticleController = async(req,res) => {
    const userId = req.params.userId;
    
    try {
        // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
        res.status(200).json({ articles: user.articles, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
   }
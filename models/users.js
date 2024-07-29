import { Schema, model } from 'mongoose';

// Define schema for articles
const ArticleSchema = new Schema({
    articleName: {
        type: String,
        required: true
    },
    articleText: {
        type: String,
        required: true
    },
    articleSource: {
        type: String,
        required: true
    },
    articleImage: {
        type: String, // Assuming articleImage is a URL to the image
        required: true
    },
    articleLink: {
        type: String,
        required: true
    }
}, {
    _id: true  // Ensure that _id is generated for each subdocument
});

// Extend UserSchema to include an array of articles
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    articles: {
        type: [ArticleSchema], // Array of ArticleSchema
        validate: [arrayLimit, '{PATH} exceeds the limit of 10'] // Custom validator for limiting array size
    }
});

// Custom validator function to limit array size to 10
function arrayLimit(val) {
    return val.length <= 10;
}

const User = model('User', UserSchema);
export default User;

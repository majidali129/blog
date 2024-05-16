

import mongoose, { Schema } from 'mongoose'

const postSchema = Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    author: {
        type: String,
        required: [true, 'Please add author of post']
    },
    topic: {
        type: String,
        required: true
    },
    content: String,
    tags: [String],
    date: Date,
    views: Number,
    likes: Number
}, {timestamps: true})

export const Post = mongoose.model('Post', postSchema)
import fs from 'fs'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { connectDB } from "../src/db/index.js";
import { Post } from '../src/models/post.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    path: './config.env'
  });

connectDB().then(() => {
    console.log('DB connected successfully')
})

const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, "utf-8"));
console.log(posts)
const uploadData = async() => {
    try {
        await Post.create(posts)
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2] === '--upload'){
    console.log('--upload called')
    uploadData()
}
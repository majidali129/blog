import express from 'express'

import { addNewPost, deletePost, getAllPosts, getPost, updatePost } from '../controllers/post.controller.js';

const router = express.Router()


router.route('/').get(getAllPosts)
router.route('/addNewPost').post(addNewPost)
router.route('/:id').patch(updatePost).get(getPost).delete(deletePost)

export default router;
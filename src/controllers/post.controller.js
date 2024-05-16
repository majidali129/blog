import { Post } from "../models/post.model.js"
import { appError } from "../utills/appError.js";
import { asyncHandler } from "../utills/asyncHandler.js";


const getAllPosts = asyncHandler(async(req, res, _) => {

    const filterObj = {...req.query};

    const excludedFields = ['sort', 'fields', 'page', 'limit']
    excludedFields.forEach(el => delete filterObj[el])


    console.log(filterObj)
    let queryStr = JSON.stringify(filterObj);
    queryStr = queryStr.replace(/\bgt|gte|lt|lte\b/g, match => `$${match}`)
    console.log(queryStr)


    let query = Post.find(JSON.parse(queryStr));

    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
        };

    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    const posts = await query;
    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
            posts
        }
    })
})

const getPost = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post) return next(new appError('No post found for that ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    })
})

const addNewPost = asyncHandler(async(req, res, next) => {
    const post = await Post.create(req.body);
    if(!post) return next(new appError('Fail to add new post', 500));

    res.status(201).json({
        status: 'success',
        data: {
            post
        }
    })
})

const updatePost = asyncHandler(async(req, res, next) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!post) return next(new appError('Fail to update the post', 500));

    res.status(201).json({
        status: 'success',
        data: {
            post
        }
    })
})

const deletePost = asyncHandler(async(req, res, next) => {
    const result = await Post.findByIdAndDelete(req.params.id);
    if(!result) return next(new appError('Fail to delete your post. Try later', 500))
    res.status(200).json({
        status: 'success',
        data: null
    })

})
export {getAllPosts, addNewPost, updatePost, getPost, deletePost}
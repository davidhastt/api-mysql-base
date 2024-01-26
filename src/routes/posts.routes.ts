import {Router} from 'express';
import { createPosts, getPosts, getPost, deletePost, updatePost } from '../controllers/post.controller';


const router = Router();

router.route('/')
	.get(getPosts)
    .post(createPosts)


router.route('/:postId')
    .get(getPost)
    .delete(deletePost)
    .put(updatePost)   

export default router;
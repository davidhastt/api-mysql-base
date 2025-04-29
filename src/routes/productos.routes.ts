import {Router} from 'express';
//import { createPosts, getPosts, getPost, deletePost, updatePost } from '../controllers/post.controller';
import {createProducto, updateProducto, getProducto, getProductos} from '../controllers/producto.controller'

const productosRoutes = Router();

productosRoutes.route('/')	
    .post(createProducto)
    .get(getProductos)

productosRoutes.route('/:id_producto')
    .put(updateProducto)
    .get(getProducto)
  

export default productosRoutes;
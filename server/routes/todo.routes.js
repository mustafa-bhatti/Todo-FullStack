import express from 'express';
import {
  getTodo,
  postTodo,
  deleteTodo,
  updateTodo,
} from '../controllers/todo.controller.js';

let router = express.Router();

router.get('/get/todo/', getTodo);
router.post('/create/todo/', postTodo);
router.delete('/delete/todo/:todoId', deleteTodo);
router.put('/update/todo/', updateTodo);

export default router;

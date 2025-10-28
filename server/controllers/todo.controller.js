import todoModel from '../models/todo.model.js';

const postTodo = async (req, res) => {
  try {
    let { title, description, date, completed = false } = req.body;
    if (!title || !description || !date) {
      return res
        .status(400)
        .json({ message: 'All field are required', success: false });
    }
    let existingTodo = await todoModel.findOne({ title });
    if (existingTodo) {
      return res
        .status(409)
        .json({ message: 'Todo Already Exists', success: false });
    }
    let newTodo = new todoModel({ title, description, date, completed });
    await newTodo.save();
    return res
      .status(201)
      .json({ message: 'Todo added successfully', success: true });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error.message,
    });
  }
};
const getTodo = async (req, res) => {
  try {
    let allTodos = await todoModel.find();
    return res.status(200).json({
      message: 'Todo  Fetched Successfully ',
      todo: allTodos,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    let todoId = req.params.todoId;
    let deleteTodo = await todoModel.findByIdAndDelete(todoId);
    return res.status(200).json({
      message: 'Todo Deleted Successfully',
      success: true,
      deleteTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
let updateTodo = async (req, res) => {
  try {
    let { todoId, title, description, date, completed } = req.body;
    let updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (date) updatedFields.date = date;
    if (completed != undefined) updatedFields.completed = completed;
    let updateTodo = await todoModel.findByIdAndUpdate(todoId, updatedFields, {
      new: true,
    });

    return res.status(200).json({
      message: 'Todo updated Successfully',
      success: true,
      updateTodo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error });
  }
};

export { postTodo, getTodo, deleteTodo, updateTodo };

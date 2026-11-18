const Todo = require("../models/Todo");

// @desc    Get all todos (supports ?completed=true/false and ?sort=asc/desc)
// @route   GET /api/todos
const getTodos = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === "true";
    }

    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const todos = await Todo.find(filter).sort({ createdAt: sortOrder });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new todo
// @route   POST /api/todos
const createTodo = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || title.trim() === "") {
      const error = new Error("Title is required");
      error.statusCode = 400;
      return next(error);
    }

    const todo = await Todo.create({ title, description, priority });

    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo (edit fields or toggle completed)
// @route   PUT /api/todos/:id
const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document
      runValidators: true, // run schema validation on update
    });

    if (!todo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};

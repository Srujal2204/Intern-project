const { createTask, fetchAllTask,updateTask,deleteTask,date } = require('../Controllers/TaskController');


const router = require('express').Router();

//to get all task
router.get('/',fetchAllTask)

//to create a task
router.post('/',createTask);

//to update a task
router.put('/:id',updateTask);

//to delete a task
router.delete('/:id',deleteTask);

//to set a dueDate
router.post('/',date);


module.exports = router;
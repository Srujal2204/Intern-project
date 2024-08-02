const TaskModel = require("../Models/task")

const createTask = async (req,res)=>{
    const data = req.body;
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201)
        .json({message:'Task is created',success:true})
    } catch (err) {
     res.status(500).json({message:'Failed to create',success:false}) ; 
     console.log(err) 
    }
};

const fetchAllTask = async (req,res)=>{
   
    try {
        const data = await TaskModel.find({});
       
        res.status(200)
        .json({message:'All tasks',success:true,data})
    } catch (err) {
     res.status(500).json({message:'Failed to fetch',success:false}) ; 
     console.log(err) 
    }
};

const updateTask = async (req,res)=>{
   
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = {$set:{...body} }
         await TaskModel.findByIdAndUpdate(id,obj);
       
        res.status(200)
        .json({message:'Task is updated successfully',success:true})
    } catch (err) {
     res.status(500).json({message:'Failed to update',success:false}) ; 
     console.log(err) 
    }
};
const deleteTask = async (req,res)=>{
   
    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id);
        res.status(200)
        .json({message:'Task is deleted',success:true})
    } catch (err) {
     res.status(500).json({message:'Failed to delete',success:false}) ; 
     console.log(err); 
    }
};

const date =  async (req, res) => {
    const { taskName, dueDate } = req.body;
    try {
        const newTask = new Task({ taskName, dueDate });
        await newTask.save();
        res.status(201).json({ success: true, message: 'Task created successfully', data: newTask });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create task', error });
    }
};

module.exports = {
    createTask,
    fetchAllTask,
    updateTask,
    deleteTask,
    date   
}
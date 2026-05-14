const express = require("express");
const router = express.Router();
const auth =  require("../middleware/auth-middleware");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/task-contoller");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTaks);

module.exports = router;
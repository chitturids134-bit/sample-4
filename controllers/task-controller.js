const Task = require("../models/task-model");

let cache = {
    data: null,
    timestamp: null
};

exports.createTask = async (req, res) => {

    const task = await Task.create({
        ...req.body,
        userId: req.user.id
    });

    cache.data = null;
    cache.timestamp = null;

    res.json(task);
};

exports.getTasks = async (req, res) => {

    const currentTime = Date.now();

    if (
        cache.data &&
        currentTime - cache.timestamp < 60000
    ) {

        return res.json({
            source: "cache",
            data: cache.data
        });
    }

    const tasks = await Task.find({
        userId: req.user.id
    });

    cache = {
        data: tasks,
        timestamp: currentTime
    };

    res.json({
        source: "database",
        data: tasks
    });
};

exports.updateTask = async (req, res) => {

    const updated = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    cache.data = null;
    cache.timestamp = null;

    res.json(updated);
};

exports.deleteTask = async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);

    cache.data = null;
    cache.timestamp = null;

    res.json({
        message: "Deleted"
    });
};
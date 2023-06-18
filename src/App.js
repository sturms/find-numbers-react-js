import './styles/app.scss'
import { useState, useEffect } from "react";
import Grid from "./Grid";
import TaskPanel from "./TaskPanel";
import Results from "./Results";
import classNames from 'classnames';

class Task {
    constructor(goodTime, averageTime){
        this.timeSpent = 0;
        this.misclicks = 0;
        this.taskId = 0;
        this.gridType = 0;
        this.key = 0;
        this.startBtnClicked = false;
        this.taskStarted = false;
        this.taskCompleted = false;
        this.pageLoaded = false;
        this.gridSize = 3;
        this.title = "Attention evaluation test, find numbers fast!";
        this.assignmentName = "";
        this.description = "";
        this.goodTime = goodTime;
        this.averageTime = averageTime;
    }
}

class FindNumbersTask extends Task {
    constructor() {
        super(60, 80);
        this.taskId = 1;
        this.gridType = 1;
        this.key = this.taskId + new Date().getMilliseconds();
        this.assignmentName = "Assignment 1";
        this.description = "Find numbers from 1 to n as fast as you can."
            + " Follow the ascending order as well! If you complete in " + this.goodTime + " seconds - very good"
            + ", if in more than " + this.averageTime + " seconds - test failed!";
    }
}

class FindBoldNumbersTask extends Task {
    constructor() {
        super(80, 100);
        this.taskId = 2;
        this.gridType = 2;
        this.key = this.taskId + new Date().getMilliseconds();
        this.assignmentName = "Assignment 2";
        this.description = "First find the number in bold font and then the same number in normal font."
            + " Follow the ascending order as well! If you complete in " + this.goodTime + " seconds - very good"
            + ", if in more than " + this.averageTime + " seconds - test failed!";
    }
}

function App() {
    const tasks = [
        new FindNumbersTask(), 
        new FindBoldNumbersTask()
    ];
    const task = tasks[0];
    const [currentTask, setTask] = useState({});
    const [selectedTaskId, setSelectedTaskId] = useState(task.taskId);

    useEffect(() => {
        setTask(tasks[selectedTaskId -1]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTaskId]);

    return <div className={classNames({showOverlay: currentTask.taskStarted})}>
        <TaskPanel task={currentTask} setTask={setTask} selectedTaskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId} allTasks={tasks} />
        <Results task={currentTask} setTask={setTask} />
        <Grid task={currentTask} setTask={setTask} />
    </div>;
}

export default App;
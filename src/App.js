import './styles/app.scss'
import { useState } from "react";
import Grid from "./Grid";
import TaskPanel from "./TaskPanel";
import Results from "./Results";

class Task {
    constructor(goodTime, averageTime, badTime){
        this.timeSpent = 0;
        this.misclicks = 0;
        this.gridType = 0;
        this.startBtnClicked = false;
        this.taskStarted = false;
        this.taskCompleted = false;
        this.pageLoaded = false;
        this.gridSize = 3;
        this.title = "Attention evaluation test, find numbers as fast as you can!";
        this.assignmentName = "";
        this.description = "";
        this.goodTime = goodTime;
        this.averageTime = averageTime;
        this.badTime = badTime;
    }
}

class FindNumbersTask extends Task {
    constructor() {
        super(60, 70, 80);
        this.gridType = 1;
        this.assignmentName = "Assignment 1";
        this.description = "Find numbers from 1 to n as fast as you can."
            + " Follow the ascending order as well! If you complete in " + this.goodTime + " seconds - very good"
            + ", if in more than " + this.badTime + " seconds - test failed!";
    }
}

class FindBoldNumbersTask extends Task {
    constructor() {
        super(80, 90, 100);
        this.gridType = 2;
        this.assignmentName = "Assignment 2";
        this.description = "First find the number in bold font and then the same number in normal font."
            + " Follow the ascending order as well! If you complete in " + this.goodTime + " seconds - very good"
            + ", if in more than " + this.badTime + " seconds - test failed!";
    }
}

function App() {
    const tasks = [
        new FindNumbersTask(), 
        new FindBoldNumbersTask()
    ];
    const task = tasks[0];
    const [selectedTask, setTask] = useState(task);

    return <div className="appContainer">
        <TaskPanel task={selectedTask} setTask={setTask} />
        <Results task={selectedTask} setTask={setTask} />
        <Grid task={selectedTask} setTask={setTask} />
    </div>;
}

export default App;
import { useState, useEffect } from "react";
import Grid from "./Grid";
import TaskPanel from "./TaskPanel";

class Task {
    constructor(goodTime, averageTime, badTime){
        this.timeSpent = 0;
        this.misclicks = 0;
        this.gridType = 0;
        this.taskStarted = false;
        this.pageLoaded = false;
        this.gridSize = 7;
        this.title = "Uzmanības trennēšanas tests, atrodi skaitļus cik ātri vari!";
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
        this.description = "Uzdevums 1: Sameklē skaitļus no 1 līdz n cik ātri vari."
            + " Ievēro augošu secību! Ja tev izdosies " + this.goodTime + " sekundēs - lieliski"
            + ", ja vairāk kā " + this.badTime + " - slikti!";
    }
}

class FindBoldNumbersTask extends Task {
    constructor() {
        super(80, 90, 100);
        this.gridType = 2;
        this.description = "Uzdevums 2: Sameklē vispirms skaitli treknrakstā un tad to pašu skaitli parastajā rakstā."
            + " Ievēro augošu secību! Ja tev izdosies " + this.goodTime + " sekundēs - lieliski"
            + ", ja vairāk kā " + this.badTime + " - slikti!";
    }
}

function App() {
    const tasks = [
        new FindNumbersTask(), 
        new FindBoldNumbersTask()
    ];
    const task = tasks[1];
    const [selectedTask, setTask] = useState(task);

    return <>
        <TaskPanel task={selectedTask} setTask={setTask} />
        <Grid task={selectedTask} setTask={setTask} />
    </>;
}

export default App;
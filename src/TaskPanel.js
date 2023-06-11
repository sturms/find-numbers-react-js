import './styles/taskPanel.scss'
import { useState, memo } from "react";

function TaskPanel(props) {
    const [task, setTask] = useState(props.task);
    const start = () => {
        setTask({...task, taskStarted: true});
        // TODO: generate grid
        // TODO: show grid
        // TODO: reset/start timer
    }

    const stop = () => {
        setTask({...task, taskStarted: false});
        // TODO: stop timer
    }

    return <>
        <div className='taskPanelContainer'>
            <div className='row'>
                <div className='col-md-12'>
                    <h3 className='title'>{task.title}</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm'>
                    <div className='col-sm status'>Time spent: {task.timeSpent}</div>
                    <div className='col-sm status'>Misclicks: {task.misclicks}</div>
                    <div className='col-sm status'>
                        <input
                            className='buttons'
                            type='button' 
                            disabled={task.taskStarted}
                            onClick={() => start()}
                            value='start' />
                        <input 
                            className='buttons stop'
                            type='button'
                            disabled={!task.taskStarted}
                            onClick={() => stop()}
                            value='stop' />
                    </div>
                </div>
                <div className='col-md-8'>
                    <p>{task.description}</p>
                </div>
            </div>
        </div>
    </>;
}

export default TaskPanel;
import './styles/taskPanel.scss'
import { useState, memo } from "react";

function TaskPanel({task, setTask}) {

    const start = () => {        
        setTask(prevTaskStatus => {
            return { ...prevTaskStatus, taskStarted: true, timeSpent: 0 }
        });
        
        window.refreshIntervalId = setInterval(() => {
            setTask(previousState => {
                return { ...previousState, timeSpent: previousState.timeSpent + 1 }
            });
        }, 1000);
    }

    const stop = () => {
        setTask(prevTaskStatus => {
            return {...prevTaskStatus, taskStarted: false}
        });

        clearInterval(window.refreshIntervalId);
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
                            key='startBtn'
                            className='buttons'
                            type='button' 
                            disabled={task.taskStarted}
                            onClick={start}
                            value='start' />
                        <input
                            key='stopBtn'
                            className='buttons stop'
                            type='button'
                            disabled={!task.taskStarted}
                            onClick={stop}
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
import './styles/taskPanel.scss'
import { useEffect } from "react";

function TaskPanel({task, setTask}) {

    const start = () => {        
        setTask(prevTaskStatus => {
            return { 
                ...prevTaskStatus, 
                taskStarted: true,
                startBtnClicked: true,
                timeSpent: 0,
                misclicks: 0,
                taskCompleted: false 
            }
        });
        
        window.refreshIntervalId = setInterval(() => {
            setTask(previousState => {
                return { ...previousState, timeSpent: previousState.timeSpent + 1 }
            });
        }, 1000);
    }

    const stop = () => {
        setTask(prevTaskStatus => {
            return { ...prevTaskStatus, taskStarted: false }
        });

        clearInterval(window.refreshIntervalId);
    }

    useEffect(() => {
        // Check whether change event was not initiated by start button click
        if (!task.startBtnClicked) {
            stop();
        }
        
    }, [task.taskCompleted]);

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
                            className='buttons btn btn-primary btn-lg btn-block'
                            type='button' 
                            disabled={task.taskStarted}
                            onClick={start}
                            value='start' />
                        <input
                            key='stopBtn'
                            className='buttons stop btn btn-primary btn-lg btn-block'
                            type='button'
                            disabled={!task.taskStarted}
                            onClick={stop}
                            value='stop' />
                    </div>
                </div>
                <div className='col-md-8'>
                    <p><u>{task.assignmentName}:</u></p>
                    <p>{task.description}</p>
                </div>
            </div>
        </div>
    </>;
}

export default TaskPanel;
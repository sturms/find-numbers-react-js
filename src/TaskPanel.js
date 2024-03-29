import './styles/taskPanel.scss'
import { useEffect } from "react";
import classNames from 'classnames';

function TaskPanel({task, setTask, selectedTaskId, setSelectedTaskId, allTasks}) {
    
    const start = () => {        
        setTask(prevTaskStatus => {
            return { 
                ...prevTaskStatus, 
                taskStarted: true,
                startBtnClicked: true,
                timeSpent: 0,
                misclicks: 0,
                taskCompleted: false,
                gridType: task.gridType,
                taskId: selectedTaskId 
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
        if (!task.startBtnClicked) {
            stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [task.taskCompleted]);

    const handleTaskChange = (event) => {
        setSelectedTaskId(Number(event.target.value));
    };

    return <>
        <div className={classNames({taskPanelContainer: true, fadeOut: task.taskStarted })}>
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
                    <select value={selectedTaskId} onChange={handleTaskChange} disabled={task.taskStarted}>
                        {allTasks.map((item) => { 
                            return (<option key={item.taskId} value={item.taskId}>{item.assignmentName}</option>) 
                        })}
                    </select>
                    <p>{task.description}</p>
                </div>
            </div>
        </div>
    </>;
}

export default TaskPanel;
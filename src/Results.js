import './styles/results.scss'
import classNames from 'classnames';

function Results({task, setTask}) {
    
    return <div className='endResultContainer'>
        <div className='resultTitle'>
            <h1 className={classNames({ good: task.taskCompleted && task.timeSpent <= task.goodTime })}>Great, you passed!</h1>
            <h1 className={classNames({ average: task.taskCompleted && task.timeSpent > task.goodTime && task.timeSpent <= task.averageTime })}>Could be better</h1>
            <h1 className={classNames({ bad: task.taskCompleted && task.timeSpent > task.averageTime })}>Failed</h1>
        </div>
        
        <div className='resultExplanation'>
            <div className={classNames({ good: task.taskCompleted && task.timeSpent <= task.goodTime })}>
                Gratz, you finished the assignment in {task.timeSpent} sekundēs, this is a good result (minimum requirement is {task.badTime} seconds)!
            </div>
            <div className={classNames({ average: task.taskCompleted && task.timeSpent > task.goodTime && task.timeSpent <= task.averageTime })}>
                You passed, the assignment was finished in {task.timeSpent} seconds, but it was a close call (minimum requirement is {task.badTime} seconds)!
            </div>
            <div className={classNames({ bad: task.taskCompleted && task.timeSpent > task.averageTime })}>
                Unfortunatelly you didn't pass the assignment. Your time was {task.TimeSpent} seconds (minimum requirement is {task.badTime} seconds).
            </div>
        </div>
        
    </div>;
}

export default Results;
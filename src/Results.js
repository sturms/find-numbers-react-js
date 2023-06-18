import './styles/results.scss'
import classNames from 'classnames';

function Results({task, setTask}) {
    
    return <div className='endResultContainer'>
        {/* Title */}
        <div className='resultTitle'>
            <h1 className={classNames({ 
                    good: task.taskCompleted 
                        && task.timeSpent <= task.goodTime
                        && task.misclicks < 10
                })}>Outstanding, you passed!</h1>
            <h1 className={classNames({
                    average: task.taskCompleted
                        && task.timeSpent > task.goodTime
                        && task.timeSpent <= task.averageTime
                        && task.misclicks < 10
                })}>Great, you passed!</h1>
            <h1 className={classNames({
                    bad: task.taskCompleted
                        && (task.timeSpent > task.averageTime
                            || task.misclicks > 10)
                })}>Failed</h1>
        </div>
        
        {/* Description */}
        <div className='resultExplanation'>
            {/* Good results */}
            <div className={classNames({ 
                    good: task.taskCompleted
                        && task.misclicks === 0
                        && task.timeSpent <= task.goodTime 
                })}>
                Amazing, you finished the assignment in {task.timeSpent} seconds and without any misclicks, this is a very good result!!!
            </div>
            <div className={classNames({ 
                    good: task.taskCompleted
                        && task.misclicks > 0
                        && task.misclicks <= 5
                        && task.timeSpent <= task.goodTime 
                })}>
                Amazing, you finished the assignment in {task.timeSpent} seconds with only {task.misclicks} misclicks (on 10 misclicks you would fail automatically).
                 This is a good result!
            </div>
            <div className={classNames({ 
                    good: task.taskCompleted
                        && task.misclicks > 0
                        && task.misclicks > 5
                        && task.misclicks <= 10
                        && task.timeSpent <= task.goodTime 
                })}>
                Great job, you finished the assignment in {task.timeSpent} seconds, however, it was quite inaccurate as you had {task.misclicks} misclicks (on 10+ misclicks you would fail automatically).
                 This is ok result!
            </div>
            {/* Average results */}
            <div className={classNames({ 
                    average: task.taskCompleted
                        && task.misclicks === 0
                        && task.timeSpent > task.goodTime
                        && task.timeSpent <= task.goodTime + 10
                        && task.timeSpent <= task.averageTime 
                })}>
                The assignment was finished in {task.timeSpent} seconds and without any misclicks, nice!
            </div>
            <div className={classNames({ 
                    average: task.taskCompleted
                        && task.misclicks === 0
                        && task.timeSpent > task.goodTime + 10
                        && task.timeSpent <= task.averageTime 
                })}>
                The assignment was finished in {task.timeSpent} seconds and without any misclicks, nice! 
                However, it was a close call!
            </div>
            <div className={classNames({ 
                    average: task.taskCompleted
                        && task.misclicks > 0
                        && task.misclicks <= 5
                        && task.timeSpent > task.goodTime
                        && task.timeSpent <= task.averageTime 
                })}>
                The assignment was finished in {task.timeSpent} seconds with {task.misclicks} misclicks (on 10+ misclicks you would fail automatically).
            </div>
            <div className={classNames({ 
                    average: task.taskCompleted
                        && task.misclicks > 5
                        && task.misclicks <= 10
                        && task.timeSpent > task.goodTime
                        && task.timeSpent <= task.averageTime 
                })}>
                The assignment was finished in {task.timeSpent} seconds, however it was a bit incaccurate, having {task.misclicks} misclicks (on 10+ misclicks you would fail automatically).
            </div>
            {/* Bad results */}
            <div className={classNames({ 
                    bad: task.taskCompleted
                    && task.misclicks === 0
                        && task.timeSpent > task.averageTime
                    })}>
                Unfortunatelly you didn't pass the assignment. Your time was {task.timeSpent}.
                 However, you were accurate as you didn't have any misclicks. Keep on trying!
            </div>
            <div className={classNames({ 
                    bad: task.taskCompleted
                        && task.misclicks > 0
                        && task.misclicks <= 5
                        && task.timeSpent > task.averageTime
                    })}>
                Unfortunatelly you didn't pass the assignment. Your time was {task.timeSpent} and misclicks {task.misclicks}.
                 Keep on trying!
            </div>
            <div className={classNames({ 
                    bad: task.taskCompleted
                        && task.misclicks > 5
                        && task.misclicks <= 10
                        && task.timeSpent > task.averageTime
                    })}>
                Unfortunatelly you didn't pass the assignment. Your time was {task.timeSpent} seconds.
                 You were also quite inaccurate, having {task.misclicks} (on 10+ misclicks you would fail automatically). Don't give up, keep on trying!
            </div>
            <div className={classNames({ 
                    bad: task.taskCompleted
                        && task.misclicks > 10
                        && task.timeSpent <= task.averageTime
                    })}>
                Unfortunatelly you didn't pass the assignment. You exceeded the maximum allowed misclicks of 10!
                 Next time try on being more accurate. :'|
            </div>
            <div className={classNames({ 
                    bad: task.taskCompleted
                    && task.misclicks > 10
                        && task.timeSpent > task.averageTime
                    })}>
                Unfortunatelly you didn't pass the assignment. You exceeded the maximum allowed misclicks of 10 and also didn't finish in time!
                 :'(
            </div>
        </div>
        
    </div>;
}

export default Results;
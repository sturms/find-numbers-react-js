import { useState, memo } from "react";
import classNames from 'classnames';
import './styles/grid.scss'

function GridRow({rowCells, task, setTask, gridProps}) {
    const [cells, setCell] = useState(rowCells);

    const mark = (cell) => {
        let isClickAllowed = isClickedItemCorrect(cell.orderNumber, gridProps.prevOrderNumber);
        if (!cell.clicked && isClickAllowed) {
            setCell(cells.map(item => {
                return item.id === cell.id
                    ? { ...item, clicked: true } // Create new object to avoid state mutation bug
                    : item;
            }));

            let gridSize = (Math.pow(task.gridSize, 2));
            if (cell.orderNumber === gridSize - 1) {
                gridProps.taskCompleted = true;
                setTask(prevTaskStatus => {
                    return { 
                        ...prevTaskStatus,
                        taskCompleted: true,
                        startBtnClicked: false
                    };
                });
            }

            gridProps.prevOrderNumber++;
        } else {
            if (!gridProps.taskCompleted){
                gridProps.misclicks++;
                setTask(prevTaskStatus => {
                    return {  ...prevTaskStatus, misclicks: gridProps.misclicks };
                });
            }
        }
    }
    
    return (
        <>
            <div className="row gridRow">
                {cells.map((cell) => {
                    return <div key={cell.id}
                    onClick={() => mark(cell)}
                    className={classNames({
                        gridCell: true,
                        boldFont: cell.boldFont,
                        normalFont: !cell.boldFont,
                        itemClicked: cell.clicked
                     })}>{cell.value}</div>;
                })}
            </div>
        </>
    );
}

function isClickedItemCorrect(orderNumber, prevOrderNumber) {
    return prevOrderNumber === orderNumber -1;
}

export default memo(GridRow);
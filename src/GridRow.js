import { useState, memo } from "react";
import classNames from 'classnames';
import './styles/grid.scss'

function GridRow({rowCells, task, setTask, gridProps}) {
    const [cells, setCell] = useState(rowCells);

    const onCellItemClick = (cell) => {
        let isClickAllowed = isClickedItemCorrect(cell.orderNumber, gridProps.prevOrderNumber);
        if (!cell.clicked && isClickAllowed) {
            handleCorrectItemClicked(cell);
        } else {
            handleWrongItemClicked();
        }
    }

    const handleCorrectItemClicked = (cell) => {
        setCell(cells.map(item => {
            return item.id === cell.id
                ? { ...item, clicked: true }                    // Create new object to avoid state mutation
                : item;
        }));

        let gridSize = (Math.pow(task.gridSize, 2));            // rows * columns
        if (cell.orderNumber === getEvenNumber(gridSize)) {     // grid is generated so that its length is an even number
            endTask();
            return;
        }

        gridProps.prevOrderNumber++;
    }

    const handleWrongItemClicked = () => {
        if (!gridProps.taskCompleted) {
            gridProps.misclicks++;

            setTask(prevTaskStatus => {
                return {  ...prevTaskStatus, misclicks: gridProps.misclicks };
            });

            if (gridProps.misclicks > 10) {
                endTask();
            }
        }
    }

    const endTask = () => {
        gridProps.taskCompleted = true;
        setTask(prevTaskStatus => {
            return { 
                ...prevTaskStatus,
                taskCompleted: true,
                startBtnClicked: false
            };
        });
    }
    
    return (
        <>
            <div className="row gridRow">
                {cells.map((cell) => {
                    return <div key={cell.id}
                    onClick={() => onCellItemClick(cell)}
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

function getEvenNumber(number) {
    return number % 2 === 0 ? number : number - 1;
}

export default memo(GridRow);
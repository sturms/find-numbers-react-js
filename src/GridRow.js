import { useState, memo } from "react";
import classNames from 'classnames';
import './styles/grid.scss'

function GridRow({rowCells, task, setTask, gridStatus, setGridStatus, gridProps}) {
    const [cells, setCell] = useState(rowCells);

    const mark = (cell) => {
        let isClickAllowed = isClickedItemCorrect(task, cell.orderNumber, gridProps.prevOrderNumber);
        if (!cell.clicked && isClickAllowed) {
            setCell(cells.map(item => {
                return item.id === cell.id
                    ? { ...item, clicked: true } // Create new object to avoid state mutation bug
                    : item;
            }));

            gridProps.prevOrderNumber++;
            setGridStatus(prevGridStatus => {
                return { ...prevGridStatus, prevOrderNumber: gridProps.prevOrderNumber };
            });

        } else {
            gridProps.misclicks++;
            setTask(prevTaskStatus => {
                return {  ...prevTaskStatus, misclicks: gridProps.misclicks };
            });
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

function isClickedItemCorrect(task, orderNumber, prevOrderNumber) {
    return prevOrderNumber === orderNumber -1;
}

export default memo(GridRow);
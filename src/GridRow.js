import { useState, memo } from "react";
import classNames from 'classnames';
import './styles/grid.scss'

function GridRow(props) {
    const [cells, setCell] = useState(props.cells);

    const mark = (cell) => {
        if (!cell.clicked) {
            setCell(cells.map(item => {
                return item.id === cell.id
                    ? { ...item, clicked: true } // Create new object to avoid state mutation bug
                    : item;
              }));
        } else {
            console.log('IT IS ALREADY MARKED!');
            // TODO: count inacuracies
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

export default memo(GridRow);
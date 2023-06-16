import { useState, useEffect } from "react";
import GridRow from './GridRow';
import './styles/grid.scss'

/**
 * 
 * @param {*} props 
 * @returns 
 */
function Grid({task, setTask, gridStatus, setGridStatus}) {
    const [gridContent, setGridContent] = useState((<div>Task is not started</div>));
    const gridProps = {
        prevOrderNumber: 0,
        misclicks: 0
    };
    const gridSize = task.gridSize;
    const gridType = task.gridType;

    useEffect(() => {
        if (!task.pageLoaded) {
            setTask(prevTaskState => {
                return {...prevTaskState, pageLoaded: true }
            });
            return;
        }

        if (task.taskStarted) {            
            let maxNumber = getEvenNumber(Math.pow(gridSize, 2));
            let gridItems = generateGridItems(gridSize, gridType, maxNumber);
            const rowsHtml = [];

            for (let i = 0; i < gridSize; i++) {
                let rowKey = i + '_row';
                rowsHtml.push(<GridRow 
                        key={rowKey}
                        task={task}
                        setTask={setTask}
                        gridStatus={gridStatus}
                        setGridStatus={setGridStatus}
                        gridProps={gridProps}
                        rowCells={gridItems.filter((item) => { return item.row === i; })}
                        />);
            }

            setGridContent(rowsHtml);
        }
        else {
            setGridContent((<div>Task ended</div>));
        }
        
    },[task.taskStarted]);

    return (
        <div className="container gridContainer">{gridContent}</div>
        );
}

/**
 * Return a new array where each item represents a grid cell and is an object.
 * @param {*} gridSize 
 * @param {*} gridType 
 * @param {*} maxNumber 
 * @returns 
 */
function generateGridItems(gridSize, gridType, maxNumber) {
     // Generate all of the numbers till max number
     let generatedNumbers = generateNumbers(maxNumber, gridType);

     // Shuffle the order/position of each number in the array
     generatedNumbers = shuffle(generatedNumbers);
 
     // Return a new array where each item represents a grid cell and is an object
     const gridItems = storeGridItemsAsObjects(gridSize, maxNumber, generatedNumbers);
     return gridItems;
}

/**
 * 
 * @param {*} gridSize 
 * @param {*} maxNumber 
 * @param {*} generatedNumbers 
 * @returns 
 */
function storeGridItemsAsObjects(gridSize, maxNumber, generatedNumbers) {
    const gridItems = [];
    for (let i = 0, r = 0, c = 0; i < maxNumber; i++, c++) {
        if (c > gridSize -1) {
            c = 0;
            r++;
        }
        
        let item = generatedNumbers[i];
        
        let gridItem = {
            id: i,
            col: c,
            row: r,
            value: item.value,
            orderNumber: item.orderNumber,
            boldFont: item.priority === 1,
            clicked: false,
            color: 'black'
        };
        console.log({ value: gridItem.value, order: gridItem.orderNumber, bold: gridItem.boldFont});

        gridItems.push(gridItem);
    }
    return gridItems;
}

class GridNumber {
    constructor(value, type, priority, orderNumber) {
        this.value = value;
        this.type = type;
        this.priority = priority;
        this.orderNumber = orderNumber;
    }
}

/**
 * 
 * @param {*} evenMaxNumber 
 * @param {*} createDuplicates 
 * @returns 
 */
function generateNumbers(evenMaxNumber, gridType) {
    let resultArray = [];
    let createDuplicates = gridType === 2;
    let maxNumber = createDuplicates ? evenMaxNumber / 2 : evenMaxNumber;
    let orderNumber = 1;

    for (let value = 1; value <= maxNumber; value++) {
        if (createDuplicates) {
            resultArray.push(new GridNumber (value, gridType, 1, orderNumber));
            orderNumber++;
        }
        resultArray.push(new GridNumber (value, gridType, 2, orderNumber));
        orderNumber++;
    }
    return resultArray;
}

/**
 * 
 * @param {*} number 
 * @returns 
 */
function getEvenNumber(number) {
    return number % 2 === 0 ? number : number - 1;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default Grid;
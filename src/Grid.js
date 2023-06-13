import { useState, useEffect } from "react";
import GridRow from './GridRow';
import './styles/grid.scss'

/**
 * 
 * @param {*} props 
 * @returns 
 */
function Grid({task, setTask}) {
    const [gridContent, setGridContent] = useState((<div>Task is not started</div>));
    const gridSize = task.gridSize;
    const gridType = task.gridType;

    useEffect(() => {
        if (!task.pageLoaded) {
            setTask({...task, pageLoaded: true});
            return;
        }

        if (task.taskStarted) {            
            let maxNumber = getEvenNumber(Math.pow(gridSize, 2));
            let gridItems = generateGridItems(gridSize, gridType, maxNumber);
            setGridContent(generateHtml(gridSize, gridItems));
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
     let generatedNumbers = generateNumbers(maxNumber, gridType === 2);

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
            boldFont: item.type === 2,
            clicked: false,
            color: 'black'
        };

        gridItems.push(gridItem);
    }
    return gridItems;
}

/**
 * 
 * @param {*} gridSize 
 * @param {*} gridItems 
 * @returns 
 */
function generateHtml(gridSize, gridItems) {
    const rowsHtml = [];
    for (let i = 0; i < gridSize; i++) {
        let rowKey = i + '_row';
        rowsHtml.push(<GridRow 
                key={rowKey} 
                cells={gridItems.filter((item) => { return item.row === i; })}
                />);
    }
    return rowsHtml;
}

/**
 * 
 * @param {*} evenMaxNumber 
 * @param {*} createDuplicates 
 * @returns 
 */
function generateNumbers(evenMaxNumber, createDuplicates) {
    let resultArray = [];
    let maxNumber = createDuplicates ? evenMaxNumber / 2 : evenMaxNumber;

    for (let i = 1; i <= maxNumber; i++) {
        resultArray.push({ value: i, type: 1 });
        if (createDuplicates) {
            resultArray.push({ value: i, type: 2 });
        }
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
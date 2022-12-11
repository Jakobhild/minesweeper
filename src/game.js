import React from 'react';
import { useState } from 'react';
import './game.css'

function Game(props) {
    const boardRow = Array.from({length: 16}, (_, i) => i)
    const squares = Array.from({length: 16}, (_, i) => {return{row: i, column: boardRow}})
    
    const [ squareContent, setSquareContent ] = useState(Array.from({length: props.rows}, _ => new Array(props.columns).fill("")));
    const [ clickedSquares, setClickedSquares ] = useState(Array.from({length: props.rows}, _ => new Array(props.columns).fill(false)))
    const [ flagedSquares, setFlagedSquares ] = useState(Array.from({length: props.rows}, _ => new Array(props.columns).fill(false)))

    const [ flagMode, setFlagMode ] = useState(false);
    const [ inGame, setInGame ] = useState(false);

    const newGame = () => {
        const mines = Array.from({length: props.mines}, () => {return {row: Math.floor(Math.random() * props.rows), column: Math.floor(Math.random() * props.columns)}});
        const state = Array.from({length: props.rows}, _ => new Array(props.columns).fill(""));
        for(let content of mines){
            state[content.row][content.column] = "X";
        }
        for(let row = 0; row < state.length; row++){
            for(let column = 0; column < state[row].length; column++){
                if(state[row][column] !== "X"){
                    let number = 0;
                    let rowsToCheckFrom = -1;
                    let rowsToCheckTo = 1;
                    let columnsToCheckFrom = -1;
                    let columnsToCheckTo = 1;
                    if(row === 0){
                        rowsToCheckFrom = 0;
                    }else if (row === state.length - 1){
                        rowsToCheckTo = 0;
                    }
                    if(column === 0){
                        columnsToCheckFrom = 0;
                    }else if(column === state[row].length -1){
                    }
                    for(let checkRow = rowsToCheckFrom; checkRow <= rowsToCheckTo; checkRow++){
                        for(let checkColumn = columnsToCheckFrom; checkColumn <= columnsToCheckTo; checkColumn++){
                            if(state[row+checkRow][column+checkColumn] === "X"){
                                number++;
                            }
                        }
                    }
                    state[row][column] = number.toString();
                }
            }
        }
        setSquareContent(state);
        setClickedSquares(Array.from({length: props.rows}, _ => new Array(props.columns).fill(false)));
        setInGame(true)
    }

    const clickSquare = (row, column) => {
        if(inGame){
            if(flagMode){
                const state = {...flagedSquares};
                state[row][column] = true;
                setFlagedSquares(state);    
            }else{
                const state = {...clickedSquares};
                state[row][column] = true;
                checkEmpty();
                setClickedSquares(state);
            }  
        }
    }

    const checkEmpty = () => {
        const state = {...clickedSquares}
        for(let row = 0; row < squareContent.length; row++){
            for(let column = 0; column < squareContent[row].length; column++){
                if(!clickedSquares[row][column]){
                    if(squareContent[row][column] !== "X"){
                        let rowsToCheckFrom = -1;
                        let rowsToCheckTo = 1;
                        let columnsToCheckFrom = -1;
                        let columnsToCheckTo = 1;
                        if(row === 0){
                            rowsToCheckFrom = 0;
                        }else if (row === squareContent.length - 1){
                            rowsToCheckTo = 0;
                        }
                        if(column === 0){
                            columnsToCheckFrom = 0;
                        }else if(column === squareContent[row].length -1){
                            columnsToCheckTo = 0;
                        }
                        check:
                        for(let checkRow = rowsToCheckFrom; checkRow <= rowsToCheckTo; checkRow++){
                            for(let checkColumn = columnsToCheckFrom; checkColumn <= columnsToCheckTo; checkColumn++){
                                if(squareContent[row+checkRow][column+checkColumn] === "0" && 
                                    clickedSquares[row+checkRow][column+checkColumn]){
                                    state[row][column] = true;
                                    row = 0;
                                    column = 0;
                                    break check;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    const getSquareClass = (content, clicked, flaged) => {
        let className = "";
        if(clicked){
            if(content === "X"){
                className = "mine"
            }else{
                switch(content){
                    case "1":
                        className = "one";
                        break;
                    case "2":
                        className = "two";
                        break;
                    case "3":
                        className = "three";
                        break;
                    case "4":
                        className = "four";
                        break;
                    case "5":
                        className = "five";
                        break;
                    case "6":
                        className = "six";
                        break;
                }
            }
            className += " clicked"
        }else{
            if(flaged){
                className = "flaged"
            }else{
                className = "not-clicked"
            }
        }
        className += " game-square"

        return className;
    }

    return(
        <div className="game">
            <table className="game-table">
                <tbody>
                    {squares.map((squares) => {
                       return( <tr key={squares.row}>{
                            squares.column.map((column) => {
                               return (<td key={column} className={getSquareClass(squareContent[squares.row][column], clickedSquares[squares.row][column], flagedSquares[squares.row][column])} onClick={() => clickSquare(squares.row, column)}>
                                {((squareContent[squares.row][column]!=="X" && squareContent[squares.row][column]!=="0") && clickedSquares[squares.row][column]) ? squareContent[squares.row][column] : ""}
                                </td>);
                            })}
                        </tr>)
                    })}
                </tbody>
            </table>
            <button onClick={newGame}>New Game</button>
            {flagMode ? <button onClick={() => setFlagMode(false)}>No flag</button> : <button onClick={() => setFlagMode(true)}>Flag</button>}
        </div>
    );
}

export default Game;
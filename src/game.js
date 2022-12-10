import React from 'react';
import { useState } from 'react';

function Game() {
    const squareContent = [{
                            id: 0,
                            x: 0,
                            y: 0,
                            content: ""
                            }];
    
    const [gameContent, setGameContent ] = useState([squareContent]);
    setGameContent([squareContent]);


   /* for(let row = 0; row < 64; row++){
        setGameContent(prevoiusGameContent => {
            return [...prevoiusGameContent, ...squareContent]
        })
    }*/
    
    /*

    var squareId = 0;
    for(let row = 0; row < 64; row++){
        for(let column = 0; column < 64; column++){
            setGameContent(prevoiusGameContent => { 
                return [...prevoiusGameContent[row], {...squareContent, id: squareId, x: column, y: row}];
            })
            squareId++;
        }
    } */

    return(
        <div className="game">
            <table>
                <tbody>
                   {gameContent.map((row) => {
                        return(<tr key={row[0].y}>{
                            row.map((square) => {
                                return <td key={square.x}>{square.id}</td>
                            })}
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Game;
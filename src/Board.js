import React from "react";
import Tile from "./Tile";
import "./Board.css"

class Board extends React.Component{

    constructor(props){
        super(props);
        this.state = {boardStates: this.createBoard(),  // x will be the inner array (col), y will be the other array (row)
                      playerWon: null, // playerWon: X means player X wins.
                      turn: 0}  // even turns: player X.
        this.playerClickHandler = this.playerClickHandler.bind(this); // this modifies the state of the tile.
        this.createBoard = this.createBoard.bind(this);  // creates the board; called only upon initialization
        this.checkBoard = this.checkBoard.bind(this); // checks whether we already have a winner or not!
    }

    playerClickHandler(y, x){
        console.log("Board's playerClickHandler called!");
        console.log(`current turn: ${this.state.turn}`);

        if(this.state.turn < 9){
            let board = this.state.boardStates;
            if(this.state.turn % 2 == 0){
                board[y][x] = "X";
            }
            else{
                board[y][x] = "O";
            }
            this.setState({boardStates: board});

            let winner = this.checkBoard();
            console.log(`current winner : ${winner}`);
            if(winner){
                if(winner == "X"){
                    this.setState({playerWon: "X"});
                }
                else if(winner == "O"){
                    this.setState({playerWon: "O"});
                }
            }
        }

        const currentTurn = this.state.turn;
        this.setState({turn: currentTurn + 1});
    }

    checkBoard(){
        // for now, we are checking all possible wins...

        // col 1 win
        if(this.state.boardStates[0][0] == this.state.boardStates[1][0] && this.state.boardStates[2][0] == this.state.boardStates[1][0]){
            return this.state.boardStates[0][0];
        }
        if(this.state.boardStates[0][1] == this.state.boardStates[1][1] && this.state.boardStates[2][1] == this.state.boardStates[1][1]){
            return this.state.boardStates[0][1]; // col 2 win
        }
        if(this.state.boardStates[0][2] == this.state.boardStates[1][2] && this.state.boardStates[2][2] == this.state.boardStates[1][2]){
            return this.state.boardStates[0][2]; // col 3 win
        }
        if(this.state.boardStates[0][0] == this.state.boardStates[0][1] && this.state.boardStates[0][2] == this.state.boardStates[0][1]){
            return this.state.boardStates[0][0];  // row 1 win
        }
        if(this.state.boardStates[1][0] == this.state.boardStates[1][1] && this.state.boardStates[1][2] == this.state.boardStates[1][1]){
            return this.state.boardStates[1][0];  // row 2 win
        }
        if(this.state.boardStates[2][0] == this.state.boardStates[2][1] && this.state.boardStates[2][2] == this.state.boardStates[2][1]){
            return this.state.boardStates[2][0];  // row 3 win
        }

        if(this.state.boardStates[0][0] == this.state.boardStates[1][1] && this.state.boardStates[2][2] == this.state.boardStates[1][1]){
            return this.state.boardStates[0][0];  // diag 1 win
        }

        if(this.state.boardStates[2][0] == this.state.boardStates[1][1] && this.state.boardStates[0][2] == this.state.boardStates[1][1]){
            return this.state.boardStates[2][0];  // diag 2 win
        }
            return null;
        
    }

    createBoard(){    // creates the board
        let board = [];
        for(let y=0; y<3; y++){
            let row = [];
            for(let x=0; x<3; x++){
                row.push(" ");
            }
            board.push(row);
        }
        return board;
    }
    
    
    render(){
       let boardTable = [];
       for(let y=0; y<3; y++){
        let row = [];
        for(let x=0; x<3; x++){
            row.push( 
                <Tile 
                key={`${y}-${x}`}
                buttonState={this.state.boardStates[y][x]}
                playerClick={()=>{ return this.playerClickHandler(y, x)}}
                />
            );  
        }
        boardTable.push(<tr key={y}>{row}</tr>);
       }

        return(
            <div className="Board">
                <div className="gameHeader">
                    <h1>Tic Tac Toe!</h1>
                </div>

                <div className="tableDiv">
                    <table>
                        <tbody>
                            {boardTable}   
                        </tbody>
                    </table>
                </div>

                <div className="gameMsg">
                    {this.state.playerWon!= null && <h1>{`player ${this.state.playerWon} won!`}</h1>}
                    {this.state.turn > 8 && this.state.playerWon == null && <h1>game over!</h1>}
                </div>
            </div>
        );
    }
}

export default Board;
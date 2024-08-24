 import { useState } from "react";
import GameBoard from "./GameBoard";
import Player from "./Player";
import Log from "./Log";
import GameOver from "./GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS={
  X:'player 1',
  O:'player 2'
};
const INITIAL_GAME_BOARD =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
 ];
function deriveActivePlayer(gameturns){

  let currentplayer ='X';
  

      if(gameturns.length > 0 && gameturns[0].player === 'X'){
         currentplayer = 'O';
         

    }
    return currentplayer;
}
//----------------------------------derivegameborad-----------------------------------------------------------------------//

function deriveGameBorad(gameturns){
  
  let gameBoard = [...INITIAL_GAME_BOARD.map(array =>[...array])];
 
for( const turn of gameturns){
  const {square,player} =turn;
  const { row,col}= square;
  gameBoard[row][col] = player;
}
   return gameBoard;
}







//---------------------------------derivewinner--------------------------------------------------------------//
function deriveWinner(gameBoard,players){
  let winner;

for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol =gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
      if(
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ){
         winner = players[firstSquareSymbol] ;
        
      }

    }
    return winner;
}

//---------------------------------------------------------------------------------------------//

function App() {
   const[players,setplayers]=useState(PLAYERS);

   const[gameturns,setgameturns]= useState([]);

   const activePlayer= deriveActivePlayer(gameturns);

   const gameBoard= deriveGameBorad(gameturns);

   const winner= deriveWinner(gameBoard,players);

   const gamedraw = gameturns.length === 9 && !winner;



   

function handleselectbox(rowIndex,colIndex){
  setgameturns((prevTurns) =>
     {
      const currentplayer= deriveActivePlayer(prevTurns);
      const updateTurns =[
        {square: {row : rowIndex, col :colIndex}, player : currentplayer},
       ...prevTurns,
      ];
      return updateTurns;
    });
  }
  //--------------rematch-------------------------------------------------------------//
  function rematch(){
    setgameturns([]);
  }
//------------------------NAMECHANGE------------------------------------------------//
 function playernamechange(symbol,newname){
   setplayers(prevPlayers =>{
    return {
      ...prevPlayers,
      [symbol]:newname
    };
  });
 }

//----------------------app----------------------------------------------------------//


  return (
    
    <main>
      <div className="game-container">
        <ol id ="players" className="highlight-player">
         <Player 
         initialName={PLAYERS.X} 
         symbol="X" 
         isActive={activePlayer ==='X'}
          onChangeName={playernamechange} />
          <Player 
          initialName={PLAYERS.O}
          symbol="O" 
          isActive={activePlayer ==='O'}
          onChangeName={playernamechange}/> 
        </ol>
        {(winner||gamedraw ) &&  <GameOver winner={winner} gamerematch={rematch}/> }
    <GameBoard  
    onClickbutton={handleselectbox} 
    board = {gameBoard}     />
  
 </div>   
<Log  turns={gameturns}  />
</main>
     
);

 } 
export default App;

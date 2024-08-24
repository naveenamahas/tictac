import { WINNING_COMBINATIONS } from "./winning-combinations"

export default function GameOver({winner,gamerematch}){
    return( <div id = "game-over">
        <h2>Game Over!</h2>
        {winner &&<p>{winner} won!</p>}
        {!winner && <p> It's draw the game</p>}
        <p>
    <button onClick={gamerematch}>Rematch!</button>
        </p>
    </div>
    );
}
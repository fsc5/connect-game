import "./ConnectGame.css"
import {useState} from 'react';
import {width, height, Players} from "./GameDefinitions"
import {isDiagnolWin, isVerticalWin, isHorizontalWin} from "./WinCheck"
import downArrow from "./arrow.svg"
import reset from "./reset.svg"



function InjectButton({onClick, isOver}) {
    return (
        <input type="image" src={downArrow} onClick={onClick} disabled={isOver} className="Inject-Button"/>
    )
}

function StateLine({currentPlayer, isOver}){
    let text = "";
    if(isOver){
        text += " has won!";
    }
    return <h2 className="Status-Line"><b className={Players[currentPlayer].StyleName}>{Players[currentPlayer].Name}</b> {text}</h2>

}

function GameSquare({occupingPlayer}) {
    let value;
    if(occupingPlayer !== -1){
        value = <div className={"Occupied-Square " + Players[occupingPlayer].StyleName} />;
    }
    return (
        <div className="Game-Square">
            {value}
        </div>
    );
}


export default function ConnectGame() {
    

    const [SquarePlayers, SetSquarePlayers] = useState(Array.from(Array(height), () => new Array(width).fill(-1)));
    const [CurrentPlayer, SetCurrentPlayer] = useState(0);
    const [IsOver, SetIsOver] = useState(false);


    function getGameState(){
        if(isDiagnolWin(SquarePlayers) || isHorizontalWin(SquarePlayers) || isVerticalWin(SquarePlayers)){
            return {isOver:true, winner:CurrentPlayer};
        }
        return {isOver:false};
    }

    function handleReset(){
        SetSquarePlayers(Array.from(Array(height), () => new Array(width).fill(-1)));
        SetCurrentPlayer(0);
        SetIsOver(false);
    }


    function handleInject(column){
        if(SquarePlayers[0][column] !== -1){
            return;
        }        
        for(let i=height-1;i>=0;i--){
            if(SquarePlayers[i][column] === -1){
                SquarePlayers[i][column] = CurrentPlayer;
                SetSquarePlayers(SquarePlayers);
                break;
            }
        }
        let state = getGameState();
        if(state.isOver){
            SetIsOver(true);
            return;
        }

        SetCurrentPlayer(CurrentPlayer + 1 !== Players.length ? CurrentPlayer + 1 : 0);
    }

    let injectLine = [];
    for(let i=0;i<width;i++){
        injectLine.push(
            <InjectButton onClick={() => handleInject(i)} isOver={IsOver}/>
        );
    }

    let gameBoard = []
    for(let i=0;i<height;i++){
        for(let j=0;j<width;j++){
            gameBoard.push(<GameSquare  occupingPlayer={SquarePlayers[i][j]}/>);
        }
    }

    return <div className="Game-Board">
        {injectLine}
        {gameBoard}
        <StateLine isOver={IsOver} currentPlayer={CurrentPlayer}/>
        <input className="Reset-Button" type="image" src={reset} onClick={handleReset}/>
    </div>;
}

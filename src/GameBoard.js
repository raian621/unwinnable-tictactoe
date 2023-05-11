import { useState } from "react"
import whoWon from "./game/whoWon"
import GameCell from './GameCell'

function GameBoard() {
  const [cellValues, setCellValues] = useState([...new Array(9)].map(() => ' ')) 
  const [playerTurn, setPlayerTurn] = useState('X')
  const [winner, setWinner] = useState('None')
  const [moves, setMoves] = useState(0)

  const setCellValue = (i) => {
    if (cellValues[i] !== ' ' || winner !== 'None')
      return
    const newCellValues = [...cellValues]
    newCellValues[i] = playerTurn
    setPlayerTurn(playerTurn === 'X' ? 'O' : 'X')
    setCellValues(newCellValues)
    let new_winner = whoWon(newCellValues)
    console.log('Winner = ' + new_winner)
    setWinner(new_winner)
    setMoves(moves + 1)
  }

  const resetGameBoard = () => {
    setCellValues([...new Array(9)].map(() => ' '))
    setPlayerTurn('X')
    setMoves(0)
    setWinner('None')
  }

  return (
    <>
      <h1>It is player {playerTurn}'s turn</h1>
      <div className='game-board'>
        {cellValues.map((value, i) => {
          return <GameCell value={value} setValue={() => { setCellValue(i) }}/>
        })}
      </div>
      {(winner !== 'None') && <h1>{winner} won!!!</h1>}
      {(moves === 9 && winner === 'None') && <h1>Draw...</h1>}
      <div className='game-controls'>
        <button onClick={() => resetGameBoard()}>
          Reset
        </button>
        <button>
          Play as
        </button>
      </div>
    </>
  )
}

export default GameBoard
  
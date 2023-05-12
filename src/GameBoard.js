import { useEffect, useState } from "react"
import { alphaBetaDecision, MinMaxTree } from "./game/minmax"
import whoWon from "./game/whoWon"
import GameCell from './GameCell'

function GameBoard() {
  const [cellValues, setCellValues] = useState([...new Array(9)].map(() => ' ')) 
  const [winner, setWinner] = useState('None')
  const [userPlayer, setUserPlayer] = useState('X')

  useEffect(() => {
    let new_winner = whoWon(cellValues)
    console.log('Winner = ' + new_winner)
    setWinner(new_winner)
  }, [cellValues])

  const resetGameBoard = () => {
    setCellValues([...new Array(9)].map(() => ' '))
    setWinner('None')
  }

  return (
    <>
      <h1>You are playing as {userPlayer}</h1>
      <div className='game-board'>
        {cellValues.map((value, i) => {
          return <GameCell value={value} setValue={() => { 
            if (cellValues[i] !== ' ' || winner !== 'None')
              return
            const newCellValues = [...cellValues]
            newCellValues[i] = userPlayer
            // setPlayerTurn(playerTurn === 'X' ? 'O' : 'X')
            if (winner !== userPlayer) {
              let minMaxTree = new MinMaxTree(newCellValues, (userPlayer === 'X' ? 'O' : 'X'), userPlayer)
              let newBoard = alphaBetaDecision(minMaxTree)
              console.log(newBoard)
              setCellValues(newBoard)
            }
          }}/>
        })}
      </div>
      {(winner !== 'None' && winner !== 'Draw') && <h1>{winner} won!!!</h1>}
      {( winner === 'Draw') && <h1>Draw...</h1>}
      <div className='game-controls'>
        <button onClick={() => resetGameBoard()}>
          Reset
        </button>
        <button onClick={() => setUserPlayer(userPlayer === 'X' ? 'O' : 'X')}>
          Play as {userPlayer === 'X' ? 'O' : 'X'}
        </button>
      </div>
    </>
  )
}

export default GameBoard
  
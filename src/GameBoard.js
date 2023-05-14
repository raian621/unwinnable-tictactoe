import { useEffect, useState } from "react"
import { whoWon, alphaBetaDecision, MinMaxTree } from "./game"
import GameCell from './GameCell'

function GameBoard() {
  const [cellValues, setCellValues] = useState([...new Array(9)].map(() => ' ')) 
  const [winner, setWinner] = useState('None')
  const [userPlayer, setUserPlayer] = useState('X')

  useEffect(() => {
    let newWinner = whoWon(cellValues)
    setWinner(newWinner)
  }, [cellValues])

  const resetGameBoard = () => {
    setCellValues([...new Array(9)].map(() => ' '))
    setWinner('None')
  }

  const setCellValue = i => {
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
  }

  return (
    <>
      <h1>You are playing as {userPlayer}</h1>
        <div className='game-board-wrapper'>
          <div className='game-board'>
            <div className='grid'>
              <div className='v1-bar'/>
              <div className='v2-bar'/>
              <div className='h1-bar'/>
              <div className='h2-bar'/>
            </div>
            {cellValues.map((value, i) => {
              return <GameCell value={value} player={userPlayer} key={`game-cell-${i}`} setValue={() => { 
                setCellValue(i)
              }}/>
            })}
          </div>
        </div>
        {(winner !== 'None' && winner !== 'Draw') && <h1>{winner} won!!!</h1>}
        {(winner === 'Draw') && <h1>Draw...</h1>}
        <div className='game-controls'>
          <button className='game-control-button' onClick={() => resetGameBoard()}>
            Reset
          </button>
          <button className='game-control-button' onClick={() => setUserPlayer(userPlayer === 'X' ? 'O' : 'X')}>
            Play as {userPlayer === 'X' ? 'O' : 'X'}
          </button>
        </div>        
    </>
  )
}

export default GameBoard
  
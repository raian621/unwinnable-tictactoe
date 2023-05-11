function GameCell({setValue, value}) {
  return (
    <button className="game-cell" onClick={setValue}>
      {value}
    </button>
  )
}

export default GameCell
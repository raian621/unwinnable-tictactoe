function GameCell({setValue, value, player}) {
  let valueClass = (value === 'X' ? 'x' : value === 'O' ? 'o' : '')
  let hoverClass = ''
  if (value === ' ')
    hoverClass = (player === 'X' ? 'hover-x' : player === 'O' ? 'hover-o' : '')

  return (
    <button className={`game-cell ${valueClass} ${hoverClass}`} onClick={setValue}>
      {hoverClass === '' ? value : player}
    </button>
  )
}

export default GameCell
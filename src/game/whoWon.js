export default function whoWon(cellValues) {
  let diagCounts = [0, 0]

  for (let i = 0; i < 3; i++) {
    let rowCount = 0;
    let colCount = 0;

    for (let j = 0; j < 3; j++) {
      let rowCellValue = cellValues[3 * i + j]
      let colCellValue = cellValues[3 * j + i]
      // check rows
      if (rowCellValue === 'X')
        rowCount++
      else if (rowCellValue === 'O')
        rowCount--
      // check columns
      if (colCellValue === 'X')
        colCount++
      else if (colCellValue === 'O')
        colCount--
    }
    if (rowCount === 3 || colCount === 3)
      return 'X'
    else if (rowCount === -3 || colCount === -3)
      return 'O'
    let diagCellValues = [cellValues[3 * i + i], cellValues[3 * i + (2 - i)]]
    // check diagonals
    for (let j = 0; j < 2; j++) {
      if (diagCellValues[j] === 'X')
          diagCounts[j]++
        else if (diagCellValues[j] === 'O')
          diagCounts[j]--
    }
  }
  if (diagCounts[0] === 3 || diagCounts[1] === 3)
    return 'X'
  else if (diagCounts[0] === -3 || diagCounts[1] === -3)
    return 'O'
  return 'None'
}
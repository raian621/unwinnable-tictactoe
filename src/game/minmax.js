import whoWon from "./whoWon"

export class MinMaxTree {
  constructor(board, player, nextPlayer) {
    this.board = board
    this.player = player
    this.nextPlayer = nextPlayer
    this.children = null
    this.utility = 0
  }

  getChildren() {
    if (this.children !== null) return this.children
    else this.children = []
    
    this.board.forEach((cellValue, index) => {
      if (cellValue === ' ') {
        let childBoard = [...this.board]
        childBoard[index] = this.player
        this.children.push(new MinMaxTree(childBoard, this.nextPlayer, this.player))
      }
    })

    return this.children
  }
}

// returns the board from the action with the highest chance of winning
export function alphaBetaDecision(root) {
  if (whoWon(root.board) !== 'None')
    return root.board
  let utility = maxValue(root, -2, 2, 0)
  let action = root.board
  root.getChildren().every(child => {
    if (utility === child.utility) {
      action = child.board
      return false
    }
    return true
  })
  return action
}

function maxValue(root, alpha, beta, depth) {
  let winner = whoWon(root.board)
  if (winner === root.player) {
    root.utility = 1
    return root.utility
  }
  if (winner === root.nextPlayer) {
    root.utility = -1
    return root.utility
  }
  if (winner === 'Draw') {
    root.utility = 0
    return root.utility
  }
  root.utility = -2
  root.getChildren().forEach(child => {
    root.utility = Math.max(root.utility, minValue(child, alpha, beta, depth + 1))
    if (root.utility >= beta) return root.utility
    alpha = Math.max(alpha, root.utility)
  })
  if (depth === 0) {
    console.table(root)
  }
  return root.utility
}

function minValue(root, alpha, beta, depth) {
  let winner = whoWon(root.board)

  if (winner === root.player) {
    root.utility = -1
    return root.utility
  }
  if (winner === root.nextPlayer) {
    root.utility = 1
    return root.utility
  }
  if (winner === 'Draw') {
    root.utility = 0
    return root.utility
  }
  root.utility = 2
  root.getChildren().forEach(child => {
    root.utility = Math.min(root.utility, maxValue(child, alpha, beta, depth + 1))
    if (root.utility <= alpha)
      return root.utility
    beta = Math.min(beta, root.utility)
  })
  return root.utility
}
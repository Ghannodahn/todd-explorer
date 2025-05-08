import React, { useState, useCallback, memo } from 'react'
import styles from './match3.module.css'

// TypeScript type definitions
type TileType = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'

interface Tile {
  type: TileType
  id: string
  matched: boolean
  falling: boolean
}

interface Position {
  row: number
  col: number
}

// Game Constants
const BOARD_SIZE = 8
const TILE_TYPES: TileType[] = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange'
]
const MATCH_MIN = 3
const POINTS_PER_TILE = 10
const LEVEL_THRESHOLD = 1000
const MOVES_PER_LEVEL = 30

// Tile color mapping
const TILE_COLORS: Record<TileType, string> = {
  red: '#e74c3c',
  blue: '#3498db',
  green: '#2ecc71',
  yellow: '#f1c40f',
  purple: '#9b59b6',
  orange: '#e67e22'
}

// SVG Icons for tiles
const TILE_ICONS: Record<TileType, JSX.Element> = {
  red: (
    <svg viewBox="0 0 24 24" className={styles['tile-icon']}>
      <path
        fill="white"
        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
      />
    </svg>
  ),
  blue: (
    <svg viewBox="0 0 24 24" className={styles['tile-icon']}>
      <path
        fill="white"
        d="M12,2C17.52,2 22,5.59 22,10C22,13.1 20.25,15.75 17.36,17.43L19,21H15L13.78,17.64C13.22,17.87 12.62,18 12,18C6.48,18 2,14.41 2,10C2,5.59 6.48,2 12,2M12,4C8.69,4 6,6.69 6,10C6,13.31 8.69,16 12,16C15.31,16 18,13.31 18,10C18,6.69 15.31,4 12,4M12,6C14.21,6 16,7.79 16,10C16,12.21 14.21,14 12,14C9.79,14 8,12.21 8,10C8,7.79 9.79,6 12,6Z"
      />
    </svg>
  ),
  green: (
    <svg viewBox="0 0 24 24" className={styles['tile-icon']}>
      <path
        fill="white"
        d="M15,9L12,4L9,9H15M10,20V14H14V20H10M16,20H20V9H14L17,4H7L10,9H4V20H8V14H10V20H16Z"
      />
    </svg>
  ),
  yellow: (
    <svg viewBox="0 0 24 24" className={styles['tile-icon']}>
      <path
        fill="white"
        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
      />
    </svg>
  ),
  purple: (
    <svg viewBox="0 0 24 24" className={styles['tile-icon']}>
      <path
        fill="white"
        d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M13,9.94L14.06,11L15.12,9.94L16.18,11L17.24,9.94L15.12,7.82L13,9.94M8.88,9.94L9.94,11L11,9.94L8.88,7.82L6.76,9.94L7.82,11L8.88,9.94M12,17.5C14.33,17.5 16.31,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5Z"
      />
    </svg>
  ),
  orange: (
    <svg viewBox="0 0 24 24" className={styles['tile-icon']}>
      <path fill="white" d="M12,2L1,21H23M12,6L19.53,19H4.47" />
    </svg>
  )
}

interface TileProps {
  tile: Tile
  position: Position
  selected: boolean
  onClick: (position: Position) => void
}

// Component for individual tile
const TileComponent: React.FC<TileProps> = memo(
  ({ tile, position, selected, onClick }) => {
    const { type, matched, falling } = tile

    const classNames = [
      styles.tile,
      selected ? styles.selected : '',
      matched ? styles.matched : '',
      falling ? styles.falling : ''
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        className={classNames}
        style={{ backgroundColor: TILE_COLORS[type] }}
        onClick={() => onClick(position)}
      >
        {TILE_ICONS[type]}
      </div>
    )
  }
)

TileComponent.displayName = 'TileComponent'
const Match3Game: React.FC = () => {
  const [board, setBoard] = useState<Tile[][]>(() => initializeBoard())
  const [selectedTile, setSelectedTile] = useState<Position | null>(null)
  const [score, setScore] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [moves, setMoves] = useState<number>(MOVES_PER_LEVEL)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false)
  const [nextLevelThreshold, setNextLevelThreshold] =
    useState<number>(LEVEL_THRESHOLD)

  // Initialize game board
  function initializeBoard(): Tile[][] {
    const newBoard = Array(BOARD_SIZE)
      .fill(null)
      .map(() =>
        Array(BOARD_SIZE)
          .fill(null)
          .map(() => createTile())
      )

    // Ensure no matches on initial board
    let hasMatches = true
    while (hasMatches) {
      hasMatches = false
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (checkForMatchesAt({ row, col }, newBoard)) {
            newBoard[row][col] = createTile()
            hasMatches = true
          }
        }
      }
    }

    return newBoard
  }

  // Create a new tile
  function createTile(): Tile {
    return {
      type: TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)],
      id: Math.random().toString(36).substr(2, 9),
      matched: false,
      falling: false
    }
  }

  // Check for matches at a specific position
  function checkForMatchesAt(
    position: Position,
    boardToCheck: Tile[][]
  ): boolean {
    const { row, col } = position
    const type = boardToCheck[row][col].type

    // Check horizontal
    let horizontalMatches = 1
    // Check left
    for (let i = col - 1; i >= 0 && boardToCheck[row][i].type === type; i--) {
      horizontalMatches++
    }
    // Check right
    for (
      let i = col + 1;
      i < BOARD_SIZE && boardToCheck[row][i].type === type;
      i++
    ) {
      horizontalMatches++
    }

    // Check vertical
    let verticalMatches = 1
    // Check up
    for (let i = row - 1; i >= 0 && boardToCheck[i][col].type === type; i--) {
      verticalMatches++
    }
    // Check down
    for (
      let i = row + 1;
      i < BOARD_SIZE && boardToCheck[i][col].type === type;
      i++
    ) {
      verticalMatches++
    }

    return horizontalMatches >= MATCH_MIN || verticalMatches >= MATCH_MIN
  }

  // Find all matches on the board
  function findMatches(boardToCheck: Tile[][]): Position[] {
    const matches: Position[] = []

    // Check horizontal matches
    for (let row = 0; row < BOARD_SIZE; row++) {
      let matchType: TileType | null = null
      let matchStart = 0

      for (let col = 0; col <= BOARD_SIZE; col++) {
        // Current tile type or null if we're at the end
        const currentType =
          col < BOARD_SIZE ? boardToCheck[row][col].type : null

        if (currentType !== matchType) {
          // Check if we had a valid match before this point
          if (matchType && col - matchStart >= MATCH_MIN) {
            for (let i = matchStart; i < col; i++) {
              matches.push({ row, col: i })
            }
          }

          // Start a new potential match
          matchType = currentType as TileType | null
          matchStart = col
        }
      }
    }

    // Check vertical matches
    for (let col = 0; col < BOARD_SIZE; col++) {
      let matchType: TileType | null = null
      let matchStart = 0

      for (let row = 0; row <= BOARD_SIZE; row++) {
        // Current tile type or null if we're at the end
        const currentType =
          row < BOARD_SIZE ? boardToCheck[row][col].type : null

        if (currentType !== matchType) {
          // Check if we had a valid match before this point
          if (matchType && row - matchStart >= MATCH_MIN) {
            for (let i = matchStart; i < row; i++) {
              matches.push({ row: i, col })
            }
          }

          // Start a new potential match
          matchType = currentType as TileType | null
          matchStart = row
        }
      }
    }

    // Remove duplicates
    return matches.filter(
      (match, index, self) =>
        index ===
        self.findIndex((m) => m.row === match.row && m.col === match.col)
    )
  }

  // Handle tile click
  const handleTileClick = useCallback(
    (position: Position) => {
      if (gameOver) return

      const { row, col } = position

      // If no tile is selected, select this one
      if (!selectedTile) {
        setSelectedTile(position)
        return
      }

      // If the same tile is clicked, deselect it
      if (selectedTile.row === row && selectedTile.col === col) {
        setSelectedTile(null)
        return
      }

      // Check if the tiles are adjacent
      const isAdjacent =
        (Math.abs(selectedTile.row - row) === 1 && selectedTile.col === col) ||
        (Math.abs(selectedTile.col - col) === 1 && selectedTile.row === row)

      if (isAdjacent) {
        // Swap tiles
        swapTiles(selectedTile, position)
        setSelectedTile(null)
        // Decrease moves
        setMoves((prev) => prev - 1)
      } else {
        // Select the new tile instead
        setSelectedTile(position)
      }
    },
    [selectedTile, gameOver]
  )

  // Process matches - mark matched tiles and update score
  const processMatches = useCallback(
    (matches: Position[]) => {
      if (matches.length === 0) return

      const newBoard = [...board]

      // Mark matched tiles
      matches.forEach(({ row, col }) => {
        newBoard[row][col] = {
          ...newBoard[row][col],
          matched: true
        }
      })

      setBoard(newBoard)

      // Update score
      const matchScore = matches.length * POINTS_PER_TILE
      setScore((prevScore) => {
        const newScore = prevScore + matchScore
        // Check for level up
        if (
          Math.floor(prevScore / nextLevelThreshold) <
          Math.floor(newScore / nextLevelThreshold)
        ) {
          setLevel((prev) => prev + 1)
          setMoves(MOVES_PER_LEVEL)
          setShowLevelUp(true)
          setTimeout(() => setShowLevelUp(false), 2000)
          setNextLevelThreshold((prev) => prev + LEVEL_THRESHOLD)
        }
        return newScore
      })

      // Remove matched tiles and drop new ones
      setTimeout(() => {
        dropTiles(matches)
      }, 500)
    },
    [board, nextLevelThreshold]
  )

  // Drop tiles after matches are removed
  const dropTiles = useCallback(
    (matches: Position[]) => {
      const newBoard = [...board]

      // Process column by column
      for (let col = 0; col < BOARD_SIZE; col++) {
        // Find matched tiles in this column
        const matchedInColumn = matches
          .filter((m) => m.col === col)
          .map((m) => m.row)

        if (matchedInColumn.length === 0) continue

        // Drop tiles down
        for (let row = BOARD_SIZE - 1; row >= 0; row--) {
          if (matchedInColumn.includes(row)) {
            // Start from this position and move all tiles above down
            for (let r = row; r > 0; r--) {
              newBoard[r][col] = { ...newBoard[r - 1][col], falling: true }
            }
            // Create a new tile at the top
            newBoard[0][col] = { ...createTile(), falling: true }
          }
        }
      }

      setBoard(newBoard)

      // Reset the falling flag
      setTimeout(() => {
        const resetBoard = newBoard.map((row) =>
          row.map((tile) => ({ ...tile, falling: false }))
        )
        setBoard(resetBoard)

        // Check for new matches
        const newMatches = findMatches(resetBoard)
        if (newMatches.length > 0) {
          setTimeout(() => {
            processMatches(newMatches)
          }, 300)
        } else if (moves <= 0) {
          setGameOver(true)
        }
      }, 500)
    },
    [board, moves, processMatches]
  )

  // Swap two tiles and check for matches
  const swapTiles = useCallback(
    (pos1: Position, pos2: Position) => {
      const newBoard = [...board]
      const temp = { ...newBoard[pos1.row][pos1.col] }

      newBoard[pos1.row][pos1.col] = { ...newBoard[pos2.row][pos2.col] }
      newBoard[pos2.row][pos2.col] = { ...temp }

      setBoard(newBoard)

      // Check if the swap creates any matches
      const matches = findMatches(newBoard)

      if (matches.length > 0) {
        // Process matches
        setTimeout(() => {
          processMatches(matches)
        }, 300)
      } else {
        // No matches, swap back
        setTimeout(() => {
          const revertBoard = [...newBoard]
          revertBoard[pos2.row][pos2.col] = { ...newBoard[pos1.row][pos1.col] }
          revertBoard[pos1.row][pos1.col] = { ...temp }
          setBoard(revertBoard)
        }, 500)
      }
    },
    [board, processMatches]
  )

  // Restart the game
  const restartGame = useCallback(() => {
    setBoard(initializeBoard())
    setScore(0)
    setLevel(1)
    setMoves(MOVES_PER_LEVEL)
    setGameOver(false)
    setSelectedTile(null)
    setNextLevelThreshold(LEVEL_THRESHOLD)
  }, [])

  // Calculate progress percentage for level bar
  const progressPercentage = Math.min(
    ((score % nextLevelThreshold) / nextLevelThreshold) * 100,
    100
  )

  return (
    <div className={styles['game-container']}>
      <div className={styles['game-header']}>
        <div className={styles['stat-container']}>
          <span className={styles['stat-label']}>Score</span>
          <span className={styles['stat-value']}>{score}</span>
        </div>
        <div className={styles['stat-container']}>
          <span className={styles['stat-label']}>Level</span>
          <span className={styles['stat-value']}>{level}</span>
        </div>
        <div className={styles['stat-container']}>
          <span className={styles['stat-label']}>Moves</span>
          <span className={styles['stat-value']}>{moves}</span>
        </div>
      </div>

      <div className={styles['level-progress']}>
        <div
          className={styles['progress-bar']}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className={styles['game-board']}>
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <TileComponent
              key={tile.id}
              tile={tile}
              position={{ row: rowIndex, col: colIndex }}
              selected={
                !!selectedTile &&
                selectedTile.row === rowIndex &&
                selectedTile.col === colIndex
              }
              onClick={handleTileClick}
            />
          ))
        )}
      </div>

      {showLevelUp && <div className={styles['level-up']}>Level {level}!</div>}

      {gameOver && (
        <div className={styles['game-over']}>
          <h2>Game Over</h2>
          <p>Final Score: {score}</p>
          <button className={styles['restart-button']} onClick={restartGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default Match3Game

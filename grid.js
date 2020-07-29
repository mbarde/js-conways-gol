class Grid {
  constructor(size, lifeProbability, context, bgClr, cellClr) {
    this.bgClr = bgClr
    this.cellClr = cellClr
    this.size = size
    this.lifeProbability = lifeProbability
    this.context = context
    this.cellSize = Math.floor(context.canvas.width / this.size)
    this.initialize()
  }

  initialize() {
    this.cells = []
    for (let x = 0; x < this.size; x++) {
      let column = []
      for (let y = 0; y < this.size; y++) {
        if (Math.random() <= this.lifeProbability) {
          column.push(true)
        } else {
          column.push(false)
        }
      }
      this.cells.push(column)
    }
  }

  draw() {
    this.context.fillStyle = this.bgClr
    this.context.fillRect(
      0, 0,
      ctx.canvas.width, ctx.canvas.height
    )
    this.context.fillStyle = this.cellClr
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.cells[x][y] === true) {
          this.context.fillRect(
            x * this.cellSize, y * this.cellSize,
            this.cellSize, this.cellSize
          )
        }
      }
    }
  }

  neighbours(x, y) {
    let livingNeighbours = 0
    for (let nx = x-1; nx <= x+1; nx++) {
      for (let ny = y-1; ny <= y+1; ny++) {
        if (nx >= 0 && nx < this.size &&
            ny >= 0 && ny < this.size &&
            (nx != x || ny != y))
          {
            if (this.cells[nx][ny] === true) livingNeighbours++
          }
      }
    }
    return livingNeighbours
  }

  cloneCells() {
    let clone = []
    for (let x = 0; x < this.size; x++) {
      let column = []
      for (let y = 0; y < this.size; y++) {
        column.push(this.cells[x][y])
      }
      clone.push(column)
    }
    return clone
  }

  next() {
    let nextGen = this.cloneCells()
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        // Conways rules:
        // Any live cell with two or three live neighbours survives.
        // All other live cells die in the next generation.
        // Similarly, all other dead cells stay dead.
        let ns = this.neighbours(x, y)
        if (this.cells[x][y] === true) {
          if (ns !== 2 && ns !== 3) nextGen[x][y] = false
        } else {
          // Any dead cell with three live neighbours becomes a live cell.
          if (ns === 3) nextGen[x][y] = true
        }
      }
    }
    this.cells = nextGen
  }

  spawnGlider() {
    let x = Math.round(Math.random() * (this.size-3)) + 1
    let y = Math.round(Math.random() * (this.size-3)) + 1
    this.cells[x][y] = true
    this.cells[x-1][y] = true
    this.cells[x][y+1] = true
    this.cells[x+1][y+1] = true
    this.cells[x+1][y-1] = true
  }
}

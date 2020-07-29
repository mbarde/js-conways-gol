let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

let gridSize = document.getElementById('size').value
let lifeProb = document.getElementById('probability').value / 100
grid = new Grid(gridSize, lifeProb, ctx)
grid.draw()

function update() {
  grid.next()
  grid.draw()
}

let interval = null

let btnPlay = document.getElementById('btn-play')
btnPlay.onclick = function() {
  if (interval !== null) {
    clearInterval(interval)
    interval = null
  } else {
    interval = setInterval(update, document.getElementById('interval').value)
  }
}

let btnSpawn = document.getElementById('btn-spawn')
btnSpawn.onclick = function() {
  grid.spawnGlider()
  grid.draw()
}

let btnRepopulate = document.getElementById('btn-repopulate')
btnRepopulate.onclick = function() {
  let gridSize = document.getElementById('size').value
  let lifeProb = document.getElementById('probability').value / 100
  grid = new Grid(gridSize, lifeProb, ctx)
  grid.draw()
}

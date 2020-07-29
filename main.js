function populateGrid() {
  let gridSize = document.getElementById('size').value
  let lifeProb = document.getElementById('probability').value / 100
  grid = new Grid(gridSize, lifeProb, ctx, '#FFF', '#000')
  grid.draw()
}

function update() {
  grid.next()
  grid.draw()
}

let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')

let grid = null
let interval = null

canvas.onclick = function(evt) {
  let x = evt.x - canvas.offsetLeft
  let y = evt.y - canvas.offsetTop
  grid.onClick(x, y)
}

let btnPlay = document.getElementById('btn-play')
btnPlay.onclick = function() {
  if (interval !== null) {
    clearInterval(interval)
    interval = null
    btnPlay.textContent = 'play'
  } else {
    interval = setInterval(update, document.getElementById('interval').value)
    btnPlay.textContent = 'pause'
  }
}

let btnSpawn = document.getElementById('btn-spawn')
btnSpawn.onclick = function() {
  grid.spawnGlider()
  grid.draw()
}

let btnRepopulate = document.getElementById('btn-repopulate')
btnRepopulate.onclick = function() {
  populateGrid()
}

populateGrid()

lines = (@line "\n")*

line = dir:dir _  start:point _ "through" _ end:point {
  let [minX, maxX] = [start[0], end[0]];
  if (minX > maxX) {
    [minX, maxX] = [maxX, minX];
  }

  let [minY, maxY] = [start[1], end[1]];
  if (minY > maxY) {
    [minY, maxY] = [maxY, minY];
  }
  return [dir, [minX, minY], [maxX, maxY]];
}

dir
  = "turn on" { return true }
  / "turn off" { return false }
  / "toggle" { return null }

point = @num "," @num

num = n:$[0-9]+ { return parseInt(n, 10) }
_ = [ \t]+

lines = stats:(@stat "\n")* {
  return Object.fromEntries(stats);
}

stat = @name ":" _ @num
name
  = "Hit Points" { return 'HP' }
  / $[a-z ]i+

num = n:$[0-9]+ { return parseInt(n, 10) }
_ = [ \t]+

lines = (@sue "\n")*

sue
  = "Sue" _ sue:num ":" _ compounds:compound|1..,  "," _| {
    return {
      sue,
      compounds: new Map(compounds),
    }
  }

compound = @name ":" _ @num
name = $[a-z]i+
num = n:$[0-9]+ { return parseInt(n, 10) }
_ = [ \t]+

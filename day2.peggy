lines = (@num|3, "x"| "\n")*

num = n:$[0-9]+ { return parseInt(n, 10) }
_ = [ \t]+

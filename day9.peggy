lines = (@dist "\n")*

dist = @place _ "to" _ @place _ "=" _ @num
place = $[a-z]i+
num = n:$[0-9]+ { return parseInt(n, 10) }
_ = [ \t]+

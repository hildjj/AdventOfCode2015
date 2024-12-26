lines = (@cmd @dest "\n")*

cmd
  = @operand _ @op2 _ @operand
  / "NOT" _ o:operand { return [o, 'NOT'] }
  / o:operand  { return [o, 'EQ'] }

op2
  = "LSHIFT"
  / "RSHIFT"
  / "AND"
  / "OR"

operand
  = num
  / wire
dest = _ ar _ @wire
wire = $[a-z]+
ar = "->"

num = n:$[0-9]+ { return parseInt(n, 10) }
_ = [ \t]+

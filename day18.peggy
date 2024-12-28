lines = (@line "\n")*

line = char+

char
  = '.' { return false }
  / '#' { return true }

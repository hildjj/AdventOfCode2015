lines = (@string "\n")*

string = DQUOTE c:char* DQUOTE { return [text(), c.join('')] }

char
  = [a-z]
  / "\\" @escaped

escaped
  = "\\" { return "\\" }
  / DQUOTE { return '"' }
  / "x" h:$hex|2| { return String.fromCharCode(parseInt(h, 16)) }

DQUOTE = '"'
hex = [0-9a-f]i

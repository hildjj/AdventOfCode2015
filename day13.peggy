lines = (@happy "\n")*

happy = subject:name _ "would" _ sign:sign _ num:num _ "happiness units by sitting next to" _ object:name "." {
  return {subject, num: sign * num, object};
}

name = $[a-z]i+
sign
  = "gain" { return 1 }
  / "lose" { return -1 }

num = n:$[0-9]+ { return parseInt(n, 10) }
_ = [ \t]+

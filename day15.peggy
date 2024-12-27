lines = (@ingredient "\n")*

ingredient
  = name:name ":" _ props:prop|1.., "," _| {
    return {
      name,
      props,
    }
  }
prop
  = name _ @num

name = $[a-z]i+
num = n:$("-"? [0-9]+) { return parseInt(n, 10) }
_ = [ \t]+

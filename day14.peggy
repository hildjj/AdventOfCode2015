lines = (@deer "\n")*

deer = name:name _ "can fly" _ speed:num _ "km/s for" _ duration:num _ "seconds, but then must rest for" _ rest:num _ "seconds." {
  return {
    name,
    speed,
    duration,
    rest,
  };
}
name = $[a-z]i+
num = n:$[0-9]+ { return parseInt(n, 10) }
_ = [ \t]+

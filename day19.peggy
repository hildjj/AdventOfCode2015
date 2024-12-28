input = @replacement+ "\n" @molecule "\n"

replacement
  = @molecule _ "=>" _ @molecule "\n"

molecule = $[a-z]i+
_ = [ \t]+

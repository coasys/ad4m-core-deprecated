const fs = require('fs')

const pkg = JSON.parse(fs.readFileSync('package.json').toString())
if(!pkg['dependencies'])
  pkg['dependencies'] = {}
pkg['dependencies']['@perspect3vism/ad4m'] = "file:../../"
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))

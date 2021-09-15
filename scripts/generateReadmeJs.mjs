import fs from "fs";

let matches;
const readme = fs.readFileSync("./README.md").toString();

matches = readme.matchAll(/\n```sh(\n.+?\n)```\n/gs);
let sh = "";
for (const match of matches) {
  sh += match[1];
}
sh = sh.split('\n').map(line => {
  if(line.includes("npm install --save @perspect3vism/ad4m")) {
    return "node addLocalAd4mDep.js"
  } else {
    return line
  }
}).join("\n")
fs.writeFileSync("tmp/readme-test/readmeCodeSetup.sh", sh);

fs.writeFileSync("tmp/readme-test/addLocalAd4mDep.js", fs.readFileSync("./scripts/addLocalAd4mDep.js"))

matches = readme.matchAll(/\n```js(\n.+?\n)```\n/gs);
let js = "";
for (const match of matches) {
  js += match[1];
}
fs.writeFileSync("tmp/readme-test/readmeCode.ts", js);

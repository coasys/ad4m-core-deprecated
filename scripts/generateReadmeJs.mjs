import fs from "fs";

let matches;
const readme = fs.readFileSync("./README.md").toString();

matches = readme.matchAll(/\n```sh(\n.+?\n)```\n/gs);
let sh = "";
for (const match of matches) {
  sh += match[1];
}
fs.writeFileSync("tmp/readme-test/readmeCodeSetup.sh", sh);

matches = readme.matchAll(/\n```js(\n.+?\n)```\n/gs);
let js = "";
for (const match of matches) {
  js += match[1];
}
fs.writeFileSync("tmp/readme-test/readmeCode.ts", js);

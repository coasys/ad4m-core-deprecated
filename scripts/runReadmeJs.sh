#!/usr/bin/env bash
set -euxo pipefail

pwd
cd tmp/readme-test
npm init -y
node addLocalAd4mDep.js
bash readmeCodeSetup.sh

npx ts-node readmeCode.ts

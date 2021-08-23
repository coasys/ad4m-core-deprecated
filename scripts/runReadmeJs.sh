#!/usr/bin/env bash -euxo pipefail

pwd
cd tmp/readme-test
npm init -y
cp tsconfig.json tmp/readme-test/
bash readmeCodeSetup.sh
ts-node readmeCode.ts

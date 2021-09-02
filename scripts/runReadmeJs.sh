#!/usr/bin/env bash
set -euxo pipefail

pwd
cd tmp/readme-test
npm init -y
bash readmeCodeSetup.sh
node --loader ts-node/esm readmeCode.ts

#!/usr/bin/env bash -euxo pipefail

pwd
cd tmp/readme-test
npm init -y
bash readmeCodeSetup.sh
ts-node readmeCode.ts

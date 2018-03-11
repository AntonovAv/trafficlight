#!/usr/bin/env bash
cd $(cd "$(dirname "$0")" && pwd)
npm run start:prod > ./log.txt 2>&1

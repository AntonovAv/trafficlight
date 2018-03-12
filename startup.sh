#!/usr/bin/env bash
cd $(cd "$(dirname "$0")" && pwd)
COUNTER=0
systemctl status mongodb | grep -q "inactive"
while [[  $? -ne 0 && $COUNTER -lt 60 ]] ; do
    sleep 2
    let COUNTER+=2
    echo "Waiting for mongo to initialize... ($COUNTER seconds so far)" >> ./log.txt
    systemctl status mongodb | grep -q "inactive"
done
npm run start:prod >> ./log.txt 2>&1

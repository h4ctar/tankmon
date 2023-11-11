#!/bin/sh

set -e

if [ $# -ne 1 ]; then
    echo "Expecting the environment as only argument"
    exit 1
fi

npm ci
npm run build --workspaces --if-present
npm run dbpush --workspace backend

pm2 startOrRestart ecosystem.config.js --env $1

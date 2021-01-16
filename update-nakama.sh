#!/bin/bash

cd app
npx tsc
cd ..
docker-compose restart nakama
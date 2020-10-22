#!/bin/bash

docker exec order-payment-demo_gateway /bin/sh -c "npm install -g mongo-seeding-cli && npm i @types/node && seed -u 'mongodb://mongodb:27017/gateway' --drop-database /usr/src/app/seed/data"

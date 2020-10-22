#!/bin/bash

docker exec order-payment-demo_order /bin/sh -c "npm install -g mongo-seeding-cli && npm i @types/node && seed -u 'mongodb://mongodb:27017/orders' --drop-database /usr/src/app/seed/data"

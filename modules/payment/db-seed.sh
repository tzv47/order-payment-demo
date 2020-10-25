#!/bin/bash

docker exec order-payment-demo_payment /bin/sh -c "npm install -g mongo-seeding-cli && npm i @types/node && seed -u 'mongodb://mongodb:27017/payments' --drop-database /usr/src/app/seed/data"

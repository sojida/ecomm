#!/bin/bash

echo "Restarting app"

echo "Stoping app"

echo ""

cd docker

docker-compose down

echo ""

echo "Starting app"

echo ""

cd docker

docker-compose build

docker-compose up
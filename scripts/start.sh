#!/bin/bash

echo "Starting app"

echo ""

cd docker

docker-compose build

docker-compose up


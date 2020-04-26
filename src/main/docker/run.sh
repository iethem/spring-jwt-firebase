#!/bin/sh

echo "********************************************************"
echo "Starting Firebase Application"
echo "********************************************************"
java   $MEM_ARGS -Dspring.profiles.active=$PROFILE -jar app.jar
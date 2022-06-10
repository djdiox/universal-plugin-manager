#!/bin/bash

forever start backend -l ./backend/logs/
echo "Running local backend on pot"
cd ./frontend/ && npm run dev
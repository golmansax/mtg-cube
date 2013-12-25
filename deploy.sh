#!/bin/bash -e
#
# @author holman
#
# Shortcut script to deploy Flask web server and compile Sass

APP_FILE=app.py

usage() {
  echo "Usage ./deploy.sh (dev|prod)"
  exit
}

if [ $# -lt 1 ]; then usage; fi

# Compile the Sass files
compile_compass() {
  compass compile -c assets/compass_config.rb --force
}

# Go into script directory (which is the repo directory)
cd "$(dirname "$0")"

# Pull the latest files
git pull
git submodule init
git submodule foreach git pull origin master

compile_compass

if [ $1 == 'dev' ]; then
  python $APP_FILE dev
elif [ $1 == 'prod' ]; then
  python $APP_FILE prod
else
  usage
fi

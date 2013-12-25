#!/bin/bash -e
#
# @author holman
#
# Shortcut script to deploy Flask web server and compile Sass

APP_FILE=app.py
ENV=$1

usage() {
  echo "Usage ./deploy.sh (dev|prod)"
  exit
}

if [ $# -lt 1 ]; then usage; fi

# Pull the latest files
pull_latest() {
  if [ $ENV == 'dev' ]; then
    git pull --no-rebase
  elif [ $ENV == 'prod' ]; then
    # Don't allow uncommited changes in prod
    git pull
  fi

  git submodule init
  git submodule foreach git pull origin master
}

# Compile the Sass files
compile_sass() {
  compass compile -c assets/sass/compass.rb --force
}

compile_js() {
  r.js -o assets/js/build.js
}

# Go into script directory (which is the repo directory)
cd "$(dirname "$0")"

pull_latest
compile_sass
compile_js

if [ $ENV == 'dev' ] || [ $ENV == 'prod' ]; then
  python $APP_FILE $ENV
else
  usage
fi

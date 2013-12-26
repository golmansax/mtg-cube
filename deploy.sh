#!/bin/bash -e
#
# @author holman
#
# Shortcut script to deploy Flask web server and compile Sass

APP_FILE=app.py

# dev|prod
ENV=$1

# js|sass or not specified (which compiles everything and deploys server)
DEPLOY_MODE=$2

usage() {
  echo "Usage ./deploy.sh (dev|prod)"
  exit
}

if [[ $# -lt 1 || ( $ENV != 'dev' && $ENV != 'prod' ) ]]; then usage; fi

# Pull the latest files
pull_latest() {
  if [ $ENV == 'dev' ]; then
    git pull --no-rebase
  elif [ $ENV == 'prod' ]; then
    # Don't allow uncommited changes in prod
    git pull
  fi

  bower update
}

compile_sass() {
  compass compile -c assets/sass/compass.rb --force
}

compile_js() {
  if [ $ENV == 'dev' ]; then
    # No minifying in dev
    r.js -o assets/js/build.js optimize=none
  elif [ $ENV == 'prod' ]; then
    r.js -o assets/js/build.js
  fi

  # Remove the generated build.txt file
  # TODO: This doesnt exist because I'm compiling individually
  #rm static/assets/build.txt
}

# Go into script directory (which is the repo directory)
cd "$(dirname "$0")"

if [ $DEPLOY_MODE == 'js' ]; then
  compile_js
elif [ $DEPLOY_MODE == 'sass' ]; then
  compile_sass
else
  pull_latest
  compile_sass
  compile_js

  # Launch app
  python $APP_FILE $ENV
fi

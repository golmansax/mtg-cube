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
  echo "Usage ./deploy.sh [dev|prod] [optional:js|css|data|server]"
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

generate_data() {
  cd data
  ./dl_cardlist.sh
  ./mtg_lookup.py
  cd ..
}

deploy_server() {
  if [ $ENV == 'dev' ]; then
    # Use built in server
    python $APP_FILE $ENV
  elif [ $ENV == 'prod' ]; then
    # Launch uWSGI
    echo 'If uWSGI ini file not installed, run:'
    echo "  'ln -s /home/holman/src/mtg-cube/uwsgi/mtg-cube.ini " \
      "/etc/uwsgi/vassals/'"
    sudo stop uwsgi && sudo start uwsgi
  fi
}

# Go into script directory (which is the repo directory)
cd "$(dirname "$0")"

if [ $# -lt 2 ]; then
  # No deploy mode specified, so run everything
  pull_latest
  generate_data
  grunt $ENV
  deploy_server
else
  if [ $DEPLOY_MODE == 'data' ]; then
    generate_data
  elif [ $DEPLOY_MODE == 'server' ]; then
    deploy_server
  else
    usage
  fi
fi

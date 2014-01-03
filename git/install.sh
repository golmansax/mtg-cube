#!/bin/bash -e
# @author holman
#
# Install shared git files locally

# Go into root git directory
cd "$(git rev-parse --show-toplevel)"

# Go into .git
cd .git

echo 'Creating symlinks to files in this git folder'
FILES=( hooks )

for FILE in ${FILES[@]}; do
  echo " - $FILE"
  rm -rf $FILE
  ln -s ../git/$FILE .
done

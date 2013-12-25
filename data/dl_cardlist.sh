#!/bin/bash -e

# Downloaded files
FILE_VERSION="All Sets-2013-11-21"
ZIP_FILE=${FILE_VERSION}.zip
UNZIPPED_FILE=${FILE_VERSION}.txt
ZIP_DIR=http://www.yawgatog.com/resources/oracle

# Output
OUT_DIR=dls
OUT_FILE=mtg_database.txt

# Get the txt file
wget "$ZIP_DIR/$ZIP_FILE"
unzip "$ZIP_FILE"

# Move it to the appropriate directory
mkdir -p "$OUT_DIR"
mv "$UNZIPPED_FILE" "$OUT_DIR/$OUT_FILE"

# Clean up files
rm -f "$ZIP_FILE"

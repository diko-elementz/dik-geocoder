#!/bin/sh

ROOT_DIR=$(dirname $(readlink -m $0))

mkdir -p "${ROOT_DIR}/build/data" || exit 1

BUILD_DIR="${ROOT_DIR}/build"

if [ -f "${BUILD_DIR}/data/cities1000.zip" ]; then
   rm "${BUILD_DIR}/data/*.zip"
fi


curl -o "${BUILD_DIR}/data/countryInfo.txt" http://download.geonames.org/export/dump/countryInfo.txt && \
curl -o "${BUILD_DIR}/data/cities1000.zip" http://download.geonames.org/export/dump/cities1000.zip && \
unzip "${BUILD_DIR}/data/cities1000.zip" -d "${BUILD_DIR}/data"



#!/bin/sh

ROOT_DIR=$(dirname $(readlink -m $0))
if which nodejs > /dev/null; then
    NODE_CMD=nodejs
elif which node > /dev/null; then
    NODE_CMD=node
fi

mkdir -p "${ROOT_DIR}/build/data" || exit 1

BUILD_DIR="${ROOT_DIR}/build"

if [ -f "${BUILD_DIR}/data/cities1000.zip" ]; then
   rm -rf "${BUILD_DIR}/data" || exit 2
   mkdir -p "${ROOT_DIR}/build/data" || exit 3
fi

#################################################
# download
#################################################
curl -o "${BUILD_DIR}/data/countryInfo.txt" http://download.geonames.org/export/dump/countryInfo.txt && \
curl -o "${BUILD_DIR}/data/cities1000.zip" http://download.geonames.org/export/dump/cities1000.zip && \
unzip "${BUILD_DIR}/data/cities1000.zip" -d "${BUILD_DIR}/data" || exit 4


#################################################
# build
#################################################
if [ "$NODE_CMD" ]; then
    ${NODE_CMD} "${ROOT_DIR}/build/build.js" || exit 5
else
    exit 6
fi

cp -uv "${ROOT_DIR}/build/data/cities1000.json" "${ROOT_DIR}/dist/cities.json" || exit 7
cp -uv "${ROOT_DIR}/build/columns.js" "${ROOT_DIR}/dist/columns.js" || exit 8


#################################################
# cleanup
#################################################
rm -rf "${BUILD_DIR}/data" || exit 9

exit 0

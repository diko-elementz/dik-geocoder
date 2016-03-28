#!/bin/sh

ROOT_DIR=$(dirname $(readlink -m $0))
if which nodejs > /dev/null; then
    NODE_CMD=nodejs
elif which node > /dev/null; then
    NODE_CMD=node
fi

BUILD_DIR="${ROOT_DIR}/build"

if [ -d "${BUILD_DIR}/data" ]; then
    rm -rf "${BUILD_DIR}/data" || exit 1
else
    mkdir -p "${ROOT_DIR}/build/data" || exit 2
fi

mkdir -p "${ROOT_DIR}/build/data/cities" || exit 4
mkdir -p "${ROOT_DIR}/build/data/countries" || exit 5

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


rm -rf "${ROOT_DIR}/dist/cities" || exit 7
rm -rf "${ROOT_DIR}/dist/countries" || exit 8

cp -a "${ROOT_DIR}/build/data/cities" "${ROOT_DIR}/dist" || exit 9
cp -a "${ROOT_DIR}/build/data/countries" "${ROOT_DIR}/dist" || exit 10
cp -uv "${ROOT_DIR}/build/columns.js" "${ROOT_DIR}/dist/columns.js" || exit 11


#################################################
# cleanup
#################################################
rm -rf "${BUILD_DIR}/data" || exit 12

exit 0

#!/usr/bin/env bash
#Clean
rm -Rf dist/*
#Build SPDX
cp -Rf applications/spdx dist/spdx
cp -Rf xsdsrv dist/spdx/xsdsrv
cp -Rf public dist/spdx/xsdsrv/public
cp -Rf dist/spdx/config dist/spdx/xsdsrv/config
cp -Rf applications/spdx/config/spdx-xml-cfg.json dist/spdx/xsdsrv/config/xsdccm.json
mkdir dist/spdx/xsdsrv/tmp

#Build WebApp
cp applications/spdx/config/spdx-xml-cfg.json config/xsdccm.json
npm run-script build:spdx

#Cleanup
rm -Rf dist/spdx/*.js
rm -Rf dist/spdx/*.json
rm -Rf dist/spdx/config

#Build ICXML
cp -Rf applications/icxml dist/icxml
cp -Rf xsdsrv dist/icxml/xsdsrv
cp -Rf public dist/icxml/xsdsrv/public
cp -Rf dist/icxml/config dist/icxml/xsdsrv/config
cp -Rf applications/icxml/config/ic-xml-cfg.json dist/icxml/xsdsrv/config/xsdccm.json
mkdir dist/icxml/xsdsrv/tmp

#Build WebApp
cp applications/icxml/config/ic-xml-cfg.json config/xsdccm.json
npm run-script build:icxml

#Cleanup
rm -Rf dist/icxml/*.js
rm -Rf dist/icxml/*.json
rm -Rf dist/icxml/config

#Deploy
docker-compose up
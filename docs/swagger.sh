#!/bin/bash
jq 'walk(if type == "object" and has("header") then del(.header) else . end)' AquaTrackAPI.postman_collection.json > postman.json
postman2openapi postman.json > openapi.yaml
sed -i 's/openapi: 3\.0\.3/openapi: 3.1.0/g' openapi.yaml
sed -i '/title: AquaTrackAPI/r license.yaml' openapi.yaml
sed -i '/components:/r schemas.yaml' openapi.yaml
npm run build-docs


#!/bin/bash
jq 'walk(if type == "object" and has("header") then del(.header) else . end)' AquaTrackAPI.postman_collection.json > postman.json
postman2openapi postman.json > openapi.yaml
npm run build-docs

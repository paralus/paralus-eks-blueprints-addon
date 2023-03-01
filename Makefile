#!/bin/bash

# Libraries
TSC := node node_modules/.bin/tsc
ESLINT := node node_modules/.bin/eslint
CDK := node node_modules/.bin/cdk

deps: 
	npm install

lint: 
	$(ESLINT) . --ext .js,.jsx,.ts,.tsx

build:
	rm -rf dist && $(TSC)

list: 
	$(CDK) list

mkdocs:
	mkdocs serve 

synth: 
	$(CDK) synth	
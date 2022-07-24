install:
	npm ci
gendiff: 
	node bin/gendiff.js
lint: 
	npx eslint --fix .
test:
	npm test

.PHONY: test
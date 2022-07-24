install:
	npm ci
gendiff: 
	node bin/gendiff.js
lint: 
	npx eslint --fix .
test:
	npx jest --colors

.PHONY: test
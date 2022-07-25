install:
	npm ci
gendiff: 
	node bin/gendiff.js
lint: 
	npx eslint --fix .
test:
	npx jest --colors
test-coverage:
	npm test -- --coverage --coverageProvider=v8
.PHONY: test
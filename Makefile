install:
	npm ci
	npx simple-git-hooks
gendiff: 
	node bin/gendiff.js
lint: 
	npx eslint --fix .
test:
	npm test --colors
test-coverage:
	npm test -- --coverage --coverageProvider=v8
.PHONY: test
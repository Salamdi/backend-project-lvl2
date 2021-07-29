install: install-deps

install-deps:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test

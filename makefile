lint-frontend:
	make -C frontend lint

install:
	npm ci

deploy:
	git push heroku main

start:
	npx start-server & npm -C frontend start

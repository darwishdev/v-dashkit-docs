link:
	npm link v-dashkit


update:
	rm -rf node_modules && npm install

clean:
	npm cache clean -f && make update link


run:
	npm run dev
	
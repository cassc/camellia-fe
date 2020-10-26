.PHONY: clean sass build font replace-time
sync-file:
	rsync --exclude-from="/home/garfield/bin/projects-excluded" --exclude '*.html' -avhc --delete ./ ubgf:/var/www/public/emartech/
sass:
	npm run build:css
deploy: sass sync-file

INSTALL_PATH=~/.local/share/FoundryVTT/Data/modules/tidy5e-sheet

.PHONY: compress install

build:
	npm run build

compress: build
	cd dist/tidy5e-sheet/ && zip -r module.zip * && mv module.zip ../../

install: compress
	rm -rf $(INSTALL_PATH)
	mkdir $(INSTALL_PATH)
	unzip module.zip -d $(INSTALL_PATH)
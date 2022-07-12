
slides.pdf: slides.md
	pandoc --slide-level 2 --from markdown+smart+fenced_divs --to beamer -V lang=de-DE -o $@ $<

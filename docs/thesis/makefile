# Makefile for Master's Thesis

## The output filename
TARGET    := thesis.pdf

## Input files
MD_SRC    := $(wildcard Include/*.md)
TEX_SRC   := $(patsubst %.md,%.tex,$(MD_SRC))
RASTERIMG := $(wildcard images/*.png)
VECTORIMG := $(wildcard images/*.svg)
BIB       := Include/Literatur.bib


.PHONY: all clean distclean

## "all" should be the first (default) target in the makefile
all: $(TARGET)

## Note:
## '$@' is a variable holding the name of the target,
## and '$<' is a variable holding the (first) dependency of a rule.

## Produce final target from all input files
$(TARGET): $(TEX_SRC) $(RASTERIMG) $(patsubst %.svg,%.pdf,$(VECTORIMG)) $(BIB)


## Convert markdown source to LaTeX
%.tex: %.md
	pandoc --top-level-division=chapter  -f markdown -t latex -o $@ $<

## Convert SVG vector graphics to PDF
%.pdf: %.svg
	inkscape -A $@ $<

## Generate PDF from LaTeX
%.pdf: %.tex
	latexmk -use-make -pdf -pdflatex="pdflatex -interactive=nonstopmode" $<

## Clean most things
clean:
	-latexmk -c
	rm -f *.aux *.idx *.ind *.out *.toc *.log *.bbl *.blg *.brf *.lof *.lot *.xmpdata *.bib *.lol *.run.xml
	rm -f Include/*.aux Include/*.tex

## Clean everything
distclean: clean
	latexmk -C
	rm -f *.pdf

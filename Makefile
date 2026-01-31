.PHONY: install serve build clean new

# Install Hugo via Homebrew
install:
	brew install hugo

# Run local development server
serve:
	hugo server --buildDrafts --navigateToChanged

# Build production site
build:
	hugo --minify

# Remove generated files
clean:
	rm -rf public resources

# Create new blog post (usage: make new POST=my-post-title)
new:
	hugo new content blog/$(POST).md

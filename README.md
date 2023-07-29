[![Actions Status](https://github.com/selfexpression/frontend-project-11/workflows/hexlet-check/badge.svg)](https://github.com/selfexpression/frontend-project-11/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/07d0defb4f504592735d/maintainability)](https://codeclimate.com/github/selfexpression/frontend-project-11/maintainability)
[![CI Status](https://github.com/selfexpression/frontend-project-11/actions/workflows/npm-status.yml/badge.svg)](https://github.com/selfexpression/frontend-project-11/actions/workflows/npm-status.yml)

**[RSS Reader](https://frontend-project-11-roan-five.vercel.app/)** - Web application for convenient aggregation and reading RSS feeds. Supports multiple feeds and auto-update for the list of posts.

## How to use:

Submit a valid RSS link: feed will be added to the feeds list, and list of feed's posts wil be loaded.

If you wanna see preview of the post in the modal window - click on the preview button to the right of the post link.

Add multiple feeds to the list by submitting other valid RSS links.

If a feed(s) has new posts, they will automatically be uploaded to the list of posts.

## Local install for developers:

```sh
git clone https://github.com/selfexpression/frontend-project-11
cd frontend-project-11
make install
npm link # (You may need sudo)
make build # Build webpack project
make develop # Run webpack dev-server
```
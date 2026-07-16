# Webb Realty proof of concept

This is a dependency-free static site. The files served locally are the same files uploaded to any static host.

## Preview

Run any static file server in this directory and open its local URL. For example, `npx serve .` or Python's built-in HTTP server.

## Deploy

Upload the complete `webb-realty-poc` folder to GitHub Pages, Cloudflare Pages, Netlify, or another static host. There is no compilation step and no server-side runtime requirement.

The current contact form intentionally opens the visitor's email client. Connect it to the chosen host's form handler before production launch.

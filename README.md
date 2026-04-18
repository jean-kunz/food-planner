# purpose

This is a web app to help plan meals for any kind of familly.


# Tech

## Architecture

- DB: a supabase db directly accessed by the front-end
- front-end: a typescript app that access supabase db directly and is deployed as cloudflare pages.

## Techstack

Use mise to manage node, pnpm, ... 

### Frontend

- sveltekit
- tailwind css
- supabase-js to connect to db
- pnpm
- vite

Provide different login scheme for end-user like google oauth. User can signin in supabase too with username/password.



# Notes App

It's an app for notes. Maybe we'll figure out a more compelling pitch later, but that's enough to get started!

## The Plan

### Tech Stack

- NextJS
- TypeScript
- TypeORM
- PostgreSQL
- BaseUI
- TailwindCSS

### Implementation Steps

- Init a NextJS project
- Configure Postgres and TypeORM
- Seed initial test notes
- Create server rendered index page that lists all notes
- Create notes api endpoint
- Implement create new note feature
- Implement edit note feature
- Implement delete note feature
- Update styles and layout
- Deploy to Vercel
- Add dev setup and deployment notes to README

## Dev Log

- I initially named this project `notes-app` with the plan of coming up with
  something better. Now that I'm configuring the database I'm reminded that
  naming your application with a word that's important to your domain is
  awkward! I'm trying out `marginalia` as an app/database name, since it's
  just a fancy word for notes.
- I'm using an instance of Postgres local to this project, since it's part of
  the Nix dev environment. This is great for isolating dependencies, but is a
  bit awkward to set up.
  - In the nix flake we set `export PGDATA="$PWD/db"` to put the database in a
    local dir.
  - Initialize the database dir: `initdb $PGDATA`
  - Start Postgres: `pg_ctl -o '--unix_socket_directories=$PGDATA' --log='$PGDATA/log' start`
  - Create the database: `createdb -h localhost -p 5432 -U my_user marginalia`

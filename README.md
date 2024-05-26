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
- I ran into my first speed bump implementing the notes index view. I did not
  realize that the newer versions of NextJS use the React 18/19 APIs for server
  side rendering. This is very different from my previous mental model, so I had
  to re-read the docs. The ability to define server-side actions and call them
  directly from client components is nice, and reminds me of some of the things
  I like about Phoenix LiveView. Using this feature means I don't need to define
  a REST API for updating notes, although I do have to re-evaluate which parts
  of the app are client vs server rendered.
- The new app structure has a server-rendered page which fetches the notes
  collection and passes them to the client-rendered notes workspace. This
  means rendering and re-rendering the notes list is handled client-side, but
  there's no initial load state because of SSR.
- Passing notes from a server component to a client component has exposed a
  downside of using TypeORM. React can't pass arbitrary classes from server to
  client, so we need to manually copy the Note entities into plain old
  javascript objects before sending them on the wire. Maybe TypeORM has a nice
  serialization utility for this situation, but I couldn't find one.

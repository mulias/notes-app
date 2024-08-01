# Sticky

Create, edit, delete, and search a bunch of sticky notes.

This was a timed project I built in part for a job interview and in part to check in on the world of frontend JS.

![Screenshot of Sticky's interface](/sticky-screenshot.png?raw=true "Some adventuring notes")

## Local Dev

- Run `npm install` to install dependencies.
- Set up a local postgres server
  - I'm using an instance of Postgres local to this project, since it's part of the Nix dev environment. This is great for isolating dependencies, but is a bit awkward to set up.
    - In the nix flake we set `export PGDATA="$PWD/db"` to put the database in a local dir.
    - Initialize the database dir: `initdb $PGDATA`
    - Start Postgres: `pg_ctl -o '--unix_socket_directories=$PGDATA' --log='$PGDATA/log' start`
    - Create the database: `createdb -h localhost -p 5432 -U my_user sticky`
- Copy `.env.example` to `.env.local` and change settings to match your postgres config.
- Run `npm run build` and then `npm run start` to launch the app.

## Implementation Details

The tech stack for this project includes NextJS, TypeScript, TypeORM, PostgreSQL, and TailwindCSS. There's an index view that lists all text entries as sticky notes. You can create, update, and delete sticky notes, and use the search box to filter the displayed items.

## Cut for time

Given more time the first thing I would do would be to create a react context for a reducer/store to share some global app state. This would make it much easier to implement some UI features that cross between components. Namely that only one note should be edited at a time, and while editing a note it should not be possible to edit other notes, create a new note, or filter notes. Similarly when filtering notes the new note option should not be visible.

The filter implementation could also use some work. I still think using DB-backed search is the way to go since it makes pagination much simpler, but I maybe should have gone with an `ILIKE` in this basic implementation. The Full Text Search implementation has some unhelpful behavior, such as filtering out most search terms that aren't nouns. The fancy thing to do would be to use `pg_trgm` which supports fuzzy search.

Finally the UI is mostly serviceable at this point, but the error messages are pretty bad. I designed myself into a corner with the sticky note skeuomorphism, not leaving much space for error states. Maybe don't use red as a sticky note color?

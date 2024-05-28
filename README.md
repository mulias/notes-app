# Sticky

Demo app for creating, editing, deleting, and searching a bunch of sticky notes.

## The Plan

### Tech Stack

- NextJS
- TypeScript
- TypeORM
- PostgreSQL
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
- I've implemented the search/filter feature. At this point there's some global
  state that should be lifted up out of specific components, and some choices to
  be made about UX. For example when a filter is active the user probably should
  not be able to create a new note, or maybe they can create a new note and
  doing so should clear the current filter. Similarly, should the user be able
  to edit multiple notes at once, or filter while also editing?
- Choices made for filtering notes by body content: I implemented the filtering
  in SQL because it would make it easier to add pagination later. Postgres full
  text search is fiddly and not perfect, but it should be good enough for most
  cases. The matching is full word/token based instead of substring, so sometimes the
  search results will go empty in the middle of typing a word. To avoid this and
  also prevent server load we use debouncing, so that the query is not re-ran on
  every keystroke.
- Starting to add styles. I'm changing the name of the app to Sticky because
  sticky notes are an easy visual analogy to work off of.
- At this point I'm getting close to done, but there's always more things to do.
  I don't have much time today to work on this, so I'm going to try to
  prioritize what I think is most important for a nice MVP.
  - Extract env variables
  - Test deploy to Vercel
  - Add an `/edit/:id` route for when the user edits a note. While editing the
    user stays on the index view, but all the other notes are not editable, and
    you can't create a new note or search.
  - Add a query param for the current search, sync it to the user's input.
  - Add a header to the app.
  - Style buttons
  - Style error message
  - Add hover interactivity for notes/make text clickable to edit the
    body.
- There's some complexity related to using a separate notes edit route to edit a
  note while staying on the notes index page. It seems like the NextJS
  features I want are "parallel routes" and "intercepting routes", but I don't want
  to invest time into getting that working. Similarly I forgot that syncing app
  state with a query string is pretty fiddly. I got it working but it added a
  lot of dicey hooks-based code that didn't feel worth it. I think the most
  sustainable solution would be to use a reducer and a context to hold the
  global app state, which would include the list of notes, the current filter,
  and if a note is getting edited. I feel comfortable implementing that, but I'm
  pretty much out of time.
- I've reached my personal deadline, so I'm done. The final bit of style updates
  are a bit messy, but the results are mostly fine.

## Wrapping Up

### Running the App locally

- Run `npm install` to install dependencies.
- Set up a local postgres server
- Copy `.env.example` to `.env.local` and change settings to match your postgres
  config.
- Run `npm run build` and then `npm run start` to launch the app.

### Cut for time

Given more time the first thing I would do would be to create a react context
for a reducer/store to share some global app state. This would make it much
easier to implement some UI features that cross between components. Namely that
only one note should be edited at a time, and while editing a note it should not
be possible to edit other notes, create a new note, or filter notes. Similarly
when filtering notes the new note option should not be visible.

The filter implementation could also use some work. I still think using DB-backed
search is the way to go since it makes pagination much simpler, but I maybe
should have gone with an `ILIKE` in this basic implementation. The Full Text
Search implementation has some unhelpful behavior, such as filtering out most
search terms that aren't nouns. The fancy thing to do would be to use `pg_trgm`
which supports fuzzy search.

Finally the UI is mostly serviceable at this point, but the error messages are
pretty bad. I designed myself into a corner with the sticky note skeuomorphism,
not leaving much space for error states. Maybe don't use red as a sticky note
color?

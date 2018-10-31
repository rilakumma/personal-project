create table users (
    id serial primary key,
    name text,
    auth0_id text,
    email text,
    picture text
);
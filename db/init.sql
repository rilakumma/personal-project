create table users (
    id serial primary key,
    name text,
    auth0_id text,
    email text,
    picture text
);

create table items (
    id serial primary key,
    user_id int REFERENCES users(id),
    name text,
    picture text,
    year text,
    description text
);
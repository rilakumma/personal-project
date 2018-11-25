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
    title text,
    photo text,
    year text,
    description text,
    forsale boolean default false,
    price integer default 0
);


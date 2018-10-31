insert into users
(name, auth0_id, email, picture)
VALUES
(${name}, ${auth0_id}, ${email}, ${picture})
returning *;
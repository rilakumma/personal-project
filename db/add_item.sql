INSERT INTO items
(user_id, name, picture, year, description)
VALUES
(${user_id}, ${name}, ${picture}, ${year}, ${description})
returning *;
INSERT INTO items
(user_id, title, photo, year, description)
VALUES
(${user_id}, ${title}, ${photo}, ${year}, ${description})
returning *;
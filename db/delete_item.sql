delete from items
where id = ${id}
returning *;
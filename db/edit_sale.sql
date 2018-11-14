update items
set forsale = ${forsale}
where id= ${id}
returning *;
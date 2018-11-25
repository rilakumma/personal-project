update items
set title=${title}, photo=${photo}, year=${year}, description=${description}, forsale=${forsale}, price=${price}
where user_id=${user_id} and id=${id}
returning *;
update items
set name=${name}, picture=${picture}, year=${year}, description=${description}, forsale=${forsale}, price=${price}
where user_id=${user_id} and id=${id}
returning *;
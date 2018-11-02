module.exports = {
    getItems: (req,res)=>{
        const {id} = req.params;
        req.app.get('db').get_items({user_id: id}).then(items=>{
            console.log(id)
            console.log(items)
            res.status(200).send(items);
        })
    },
    addItem: (req,res)=>{
        const {item} = req.body;
        const {id} = req.params;
        req.app.get('db').add_item({user_id: id, name: item.name, year: item.year, description: item.description}).then( items =>{
            res.status(200).send('item added hehe')
        }).catch(error=>{
            console.log('error', error);
        })
    }
}
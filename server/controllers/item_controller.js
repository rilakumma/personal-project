module.exports = {
    getItems: (req,res)=>{
        const {id} = req.params;
        req.app.get('db').get_items({user_id: id}).then(items=>{
            // console.log(id)
            // console.log(items)
            res.status(200).send(items);
        })
    },
    addItem: (req,res)=>{
        const {id} = req.params;
        req.app.get('db').add_item({user_id: id, name: req.body.name, picture: req.body.picture, year: req.body.year, description: req.body.description}).then( items =>{
            res.status(200).json(items)
        }).catch(error=>{
            console.log('error', error);
        })
    }
}
module.exports = {
    getItems: (req,res)=>{
        const {id} = req.params;
        req.app.get('db').get_items({user_id: id}).then(items=>{
            res.status(200).send(items);
        }).catch(error=>{
            console.error('error getting items', error);
        })
    },
    allItems: (req,res)=>{
        req.app.get('db').all_items().then(items=>{
            res.status(200).send(items);
        }).catch(error=>{
            console.error('error getting all items', error);
        })
    },
    addItem: (req,res)=>{
        const {id} = req.params;
        req.app.get('db').add_item({user_id: id, title: req.body.title, photo: req.body.photo, year: req.body.year, description: req.body.description}).then( items =>{
            res.status(200).json(items);
        }).catch(error=>{
            console.log('error adding item', error);
        })
    },
    deleteItem: (req,res)=>{
        const {user, id} = req.params;
        req.app.get('db').delete_item({user_id: user, id: id}).then(items=>{
            res.status(200).json(items);
        }).catch( error=>{
            console.log('error with delete',error);
        })
    },
    editItem:(req,res)=>{
        const {user, id} = req.params;
        req.app.get('db').edit_item({user_id: user, id: id, title: req.body.title, photo: req.body.photo, year: req.body.year, description: req.body.description, forsale: req.body.forsale, price: req.body.price}).then(items=>{
            res.status(200).json(items);
        }).catch(error=>{
            console.error('error with edit', error);
        })
    },
    editForSale:(req,res)=>{
        const {id} = req.params;
        req.app.get('db').edit_sale({id: id, forsale: req.body.forsale}).then(items=>{
            res.status(200).json(items);
        }).catch(error=>{
            console.error('error editing sale status', error);
        })
    }
}
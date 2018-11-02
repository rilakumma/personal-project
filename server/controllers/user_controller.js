module.exports = {
    getUser: (req, res) =>{
        res.status(200).json(req.session.user);
    },
    updateUsername: (req,res)=>{
        const { username } = req.body;
        const { id } = req.params;
        req.session.user.username = username
        req.app.get('db').update_username({username: username, auth0_id: id}).then(username=>{
            res.status(200).send('Updated username');
        })
    }
    
}
module.exports = {
    getUser: (req, res) =>{
        res.status(200).json(req.session.user);
    },
    updateUsername: (req,res)=>{
        const { username } = req.body;
        const { auth0_id } = req.params;
        req.app.get('db').update_username({username: username, auth0_id: auth0_id}).then(username=>{
            res.status(200).send('Updated username');
        })
    }
    
}
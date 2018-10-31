module.exports = {
    getUser: (req, res) =>{
        res.status(200).json(req.session.user);
    },
    updateUsername: (req,res)=>{
        
    }
    
}
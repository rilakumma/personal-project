const nodemailer = require('nodemailer');

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
    },
    sendEmail: (req,res) =>{
        const {email} = req.body;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: (process.env.EMAIL),
                pass: (process.env.PASS)
            }
        })
        const mailOptions = {
            from: (process.env.EMAIL),
            to: email,
            subject: 'Welcome to pompom!',
            html: '<h1>Thanks for joining pompom. Upload your collection now!</h1>'
        }
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                console.log(err)
            } else {
                console.log(info);
            }
        });
    }
    
}
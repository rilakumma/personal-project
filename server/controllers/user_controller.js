const nodemailer = require('nodemailer');

module.exports = {
    getUser: (req, res) =>{
        res.status(200).json(req.session.user);
    },
    getUsers: (req,res)=>{
        req.app.get('db').all_users().then(users=>{
            res.status(200).send(users);
        })
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
            html: '<div style="text-align: center; "><img src="logo" /><h1 style="color: rgb(218, 55, 56); font-size: 24px;">&hearts; Thanks for joining pompom &hearts;</h1><p style="font-size: 18px; color: rgb(231, 158, 191)">Start uploading your collection now</p><p style="font-size: 18px; color: darkgrey">Discover rare collectables</p><p style="font-size: 18px; color: rgb(85, 181, 186)">Sell your items</p><a href="http://pompom.fun" style="color:rgb(218,55,56); text-decoration: none; font-size: 20px; font-weight: bold; ">Get started</a><p style="color:pink; font-size: 30px;">&hearts; &hearts; &hearts;</p></div>',
            attachments: [{
                filename: 'pompomlogo.png',
                path: '../../',
                cid: 'logo'
            }]
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
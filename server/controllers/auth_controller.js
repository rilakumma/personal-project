const axios = require('axios');

module.exports = {
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).json('Successfully logged out see ya next time')
    },
    handleLogin: (req, res) => {
        exchangeCodeForAccessToken()
            .then(exchangeAccessTokenForUserInfo)
            .then(storeUserInfoInDatabase)
            .catch(error=>{
                console.log('Problem occured in handleLogin', error)
                res.status(500).send('An unexpected error has occured');
            })

        function exchangeCodeForAccessToken(){
            let protocal = `http`;
            if(process.env.NODE_ENV=== 'production'){
                protocal = `https`;
            }
            const payload = {
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                code: req.query.code,
                grant_type: 'authorization_code',
                redirect_uri: `${protocal}://${req.headers.host}`
            }
            // console.log('payload', payload);
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
        }

        function exchangeAccessTokenForUserInfo(accessTokenRes){
            const accessToken = accessTokenRes.data.access_token;
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
        }

        function storeUserInfoInDatabase(userDataRes){
            const userData = userDataRes.data;
            return req.app.get('db').get_user({auth0_id: userData.sub}).then( users => {
                if(users.length){
                    const user = users[0];
                    req.session.user = user;
                    res.redirect('/profile');
                } else {
                    return req.app.get('db').add_user({auth0_id: userData.sub, name: userData.name, email: userData.email, picture: userData.picture})
                    .then( newUsers => {
                        const newUser = newUsers[0];
                        req.session.user = newUser;
                        res.redirect('/profile');
                    }).catch( error => {
                        console.log('error in storing user to database', error);
                        res.status(500).json('Unexpected error has occured');
                    })
                }
            })
        }
    }
}
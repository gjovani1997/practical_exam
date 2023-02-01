const jwt = require('jsonwebtoken')
const Session = require('../model/model_session')
const session_obj = new Session();
const token_pass = process.env.TOKEN_PASS;

module.exports = class Token{

    generateToken(username, user_id){

        let payload = { username: username,
                        expiration: 43200}
        let token = jwt.sign(payload, token_pass)


        let formated_data = [
            token,
            payload.expiration,
            user_id
        ]

        session_obj.create_session(formated_data);

        return {token, payload}

    }

}

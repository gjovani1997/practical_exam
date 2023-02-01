const jwt = require('jsonwebtoken')
const Session = require('../model/model_session')
const session_obj = new Session();

module.exports =  (req, res, next)=>{

    if(!req.headers.authorization){
        res.status(404).json('You are no authorized to access this resources.')
    }
    else{
        var token = req.headers.authorization.split(' ')[1]
        if(token === null){
            res.status(404).json('You are no authorized to access this resources.')
        }
     
         session_obj.find_token(token,(result)=>{

            if(!result){
                res.status(404).json('You are no authorized to access this resources.')
            }
            else if(result.token != token){
                res.status(404).json('You are no authorized to access this resources.')
            }
    
        });


        next()

       
    }
}

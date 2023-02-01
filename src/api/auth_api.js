// const Dependencies = require('../utils/dependencies')
// const dep = new Dependencies
// const var_json = dep.json
// const router = dep.router
// const bcrypt = dep.bcrypt
// const { body, validationResult } = require('express-validator')
// const error_code = require('../utils/errors')
// const User = require('../model/User')
// const Errors = require('../utils/error_array')
// const error_obj = new Errors
// const generateToken = require('../utils/token_generator')

// router.post('/', var_json, [
//         body('username', error_code['000003']).not().isEmpty(),
//         body('password', error_code['000004']).not().isEmpty()
//     ], (req, res) => {
        
//         const err = validationResult(req)
//         if (!err.isEmpty()) {
//             return res.status(422).json({ errors: err.array() })
//         }

//         User.findOne({username: req.body.username}, (error, data) => {

//             if(error){
//                 var error_array = error_obj.loadData(req.body.username, error_code['000001'], "username", "body")
//                 res.status(401).json({errors: error_array})
//             }
//             else{
//                 if(!data){
//                     var error_array = error_obj.loadData(req.body.username, error_code['000001'], "username", "body")
//                     res.status(422).json({errors: error_array})
//                 }
//                 else if(!bcrypt.compareSync(req.body.password, data.password)){
//                     var error_array = error_obj.loadData(req.body.password, error_code['000002'], "password", "body")
//                     res.status(422).json({errors: error_array})
//                 }
//                 else{
//                     var token = generateToken(data.username, data._id)
                    
//                     user_data = {
//                         firstname: data.firstname,
//                         lastname: data.lastname,
//                         username: data.username,
//                         role: data.role
//                     }
//                     res.status(200).json({token, user_data})
//                 }
//             }
//         }
//     )
// })


const Dependencies = require('../helper/dependency_helper');
const dept_helper_obj = new Dependencies();
const router = dept_helper_obj.router;
const body_parser = dept_helper_obj.json

const bcrypt = dept_helper_obj.bcrypt;

const  Users  = require('../model/model_user');
const user_obj = new Users();

const Token = require('../helper/token_helper');
const token_obj = new Token();

const validator = require('../helper/validaion_helper');

router.post('/login',body_parser,(req,res) => {

    const validationRule = {
        "username": "required|string",
        "password": "required|string",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }
        else{
            user_obj.find_user(req.body.username,(data) => {

                if(!bcrypt.compareSync(req.body.password, data.data.password)){
                    data.status_code = 0;
                    data.message = "Invalid Redentials";
                    data.data = {};
                }
                else{
                    var token = token_obj.generateToken(data.data.username, data.data.id)
                    
                    user_data = {
                        firstname: data.data.first_name,
                        lastname: data.data.last_name,
                        username: data.data.username
                    }
        
                    data.session = {...token};
                    data.data = user_data;
        
                }
        
                res.send(data);
            });
        }
    })

    
});


module.exports = router 
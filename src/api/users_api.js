const Dependencies = require('../helper/dependency_helper');
const dept_helper_obj = new Dependencies();
const router = dept_helper_obj.router;
const body_parser = dept_helper_obj.json

const  Users  = require('../model/model_user');
const user_obj = new Users();

const bcrypt = dept_helper_obj.bcrypt;
const saltRounds = 10

const auth_middleware = require('..//middleware/auth_middleware');


const Encryptor = require("../helper/en_dec_helper");
const encryptor_obj = new Encryptor();

const validator = require('../helper/validaion_helper');

router.get('/',auth_middleware,(req,res) => {

    user_obj.get_all_users(req.query,(data) => {
        // res.send(data);

        res.status(200).json(data)
    });

});


router.get('/:id',auth_middleware,(req,res) => {

    formated_data = [
        encryptor_obj.dec(req.params.id)
    ]

    user_obj.get_user(formated_data,(data) => {
        //res.send(data);
        res.status(200).json(data)
    });
    
});


router.post('/create_user',auth_middleware,body_parser,(req,res) => {

    const validationRule = {
        "email": "required|string",
        "username": "required|string",
        "contact_number": "required|string",
        "password": "required|string",
        "first_name": "required|string",
        "last_name": "required|string",
        "address": "required|string",
        "postcode": "required|string",
        "password": "required|string",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(412).send({
                    success: false,
                    message: 'Validation failed',
                    data: err
            });
        }
        else{
            let formated_data = [
                req.body.first_name,
                req.body.last_name,
                req.body.address,
                req.body.postcode,
                req.body.contact_number,
                req.body.email,
                req.body.username,
                bcrypt.hashSync(req.body.password, saltRounds)
            ]
        
            user_obj.create_user(formated_data,(data) => {
                res.status(200).json(data)
                //res.send(data);
            });
        }

    })

    
});

router.put('/update_user/:id',auth_middleware,body_parser,(req,res) => {

    const validationRule = {
        "email": "required|string",
        "username": "required|string",
        "contact_number": "required|string",
        "password": "required|string",
        "first_name": "required|string",
        "last_name": "required|string",
        "address": "required|string",
        "postcode": "required|string",
        "password": "required|string",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(412).send({
                    success: false,
                    message: 'Validation failed',
                    data: err
            });
        }
        else{
            let formated_data = [
                req.body.first_name,
                req.body.last_name,
                req.body.address,
                req.body.postcode,
                req.body.contact_number,
                req.body.email,
                req.body.username,
                req.body.password,
                encryptor_obj.dec(req.params.id)
            ]
        
            user_obj.update_user(formated_data,(data) => {
                //res.send(data);
                res.status(200).json(data)
            });
        }

    })

    
});


router.delete('/delete_user/:id',auth_middleware,body_parser,(req,res) => {

    let formated_data = [
        encryptor_obj.dec(req.params.id)
    ]

    user_obj.delete_user(formated_data,(data) => {
        res.status(200).json(data)
       // res.send(data);
    });
});

router.post('/batch_delete_user',auth_middleware,body_parser,(req,res) => {

    const validationRule = {
        "ids": "required|string"
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if(!status){
            res.status(412).send({
                    success: false,
                    message: 'Validation failed',
                    data: err
            });
        }
        else{
            let ids = req.body.ids

            ids = ids.split(',');
            let dec_ids = [];

            ids.forEach(id=>{
                dec_ids.push(encryptor_obj.dec(id))
            })


            user_obj.batch_delete_user(dec_ids.toString(),(data) => {
                //res.send(data);
                res.status(200).json(data)
            });

        }

    })

    
});


module.exports = router;
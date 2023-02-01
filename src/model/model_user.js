const Connection = require("../helper/database_helper");
const Encryptor = require("../helper/en_dec_helper");
const encryptor_obj = new Encryptor();

// const Response = require("../helper/response_helper");
// const response_obj = new Response();

Connection.connect(err => {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + Connection.threadId);
});

module.exports =  class Users {

    get_all_users(args,callback){

    try {

        let query = `SELECT * 
        FROM node_backend_users 
        ORDER BY created_at`;

        if(args.page_start && args.page_limit){
            query+=` limit ${args.page_start},${args.page_limit}`;
        }

        let bind_data = [args.page_start,args.page_limit];

        Connection.query(query,bind_data,(err, res) => {
            if (err) throw err;

            let users = [];

            res.forEach((key,val) => {
                users.push({
                    id: encryptor_obj.en(""+key.id),
                    id2: encryptor_obj.dec(encryptor_obj.en(""+key.id)),
                    first_name: key.first_name,
                    last_name: key.last_name,
                    address: key.address,
                    postcode: key.postcode,
                    contact_number: key.contact_number,
                    email: key.email,
                    username: key.username,
                    password: key.password,
                    created_at: key.created_at
                })
            });

            let response = {};

            response.status_code = 1;
            response.message = "Success!";
            response.data = users;

            callback(response);
        });

    } catch (err) {
        throw err;
      }

    }


    get_user(id,callback){

        let response = {}

        try {

            let query = `SELECT *
            FROM node_backend_users 
            WHERE id = ?`;

    
            Connection.query(query,id,(err, res) => {
                if (err) throw err;

                let user = res[0];

                if(user){
                    user.id =  encryptor_obj.en(""+user.id);
                    
                    response.status_code = 1;
                    response.message = "Success!";
                    response.data = user;
                }
                else{
                    response.status_code = 0;
                    response.message = "Unable to find user.";
                }
                
    
                callback(response);
            });
    
        } catch (err) {
            throw err;
        }

    }

    find_user(args,callback){

        try {

            let query = `SELECT id,first_name,last_name,username,password
            FROM node_backend_users 
            WHERE username = ?`;

    
            Connection.query(query,args,(err, res) => {
                if (err) throw err;

                let user = res[0];
    
                let response = {};
    
                response.status_code = 1;
                response.message = "Success!";
                response.data = user;
    
                callback(response);
            });
    
        } catch (err) {
            throw err;
        }

    }

    create_user(args,callback){

    try{

        let response = {};

        let query_email = `SELECT SUM(IF(email=?,1,0)) as email_count, SUM(IF(contact_number=?,1,0)) as cn_count, SUM(IF(username=?,1,0)) as un_count FROM node_backend_users;`;

        Connection.query(query_email,[args[5],args[4],args[6]],(err,res) => {
            if (err) throw err;

           let email_count = res[0].email_count;
           let cn_count = res[0].cn_count;
           let un_count = res[0].un_count;

           if(email_count<1 && cn_count<1 && un_count<1){
                let query = `
                    INSERT INTO node_backend_users 
                    (first_name,last_name,address,postcode,contact_number,email,username,password)
                    VALUES
                    (?,?,?,?,?,?,?,?)
                `;

                let bind_data = args

                Connection.query(query,bind_data, (error, results) => {
                    if (err) throw error;


                    response.status_code = 1;
                    response.message = "User successfully created";

                    if(results.affectedRows<1){
                        response.status_code = 0;
                        response.message = "Fail to create user";
                    }
                    else{
                        response.status_code = 1;
                        response.message = "User successfully created";
                    }

                    callback(response);
                });
           }
           else{

                let warnings = [];
                response.status_code = 0;
                response.message = "Check the data you entered";

                if(email_count>0){
                    warnings.push('Email is already taken.')
                }

                if(cn_count>0){
                    warnings.push('Contact Number is already taken.')
                }

                if(un_count>0){
                    warnings.push('Username is already taken.')
                }

                response.errors = warnings

                callback(response);
           }

        })
    }
    catch(e){
        throw e;
    }
        
    }

    update_user(args,callback){

        try{

            let response = {};

            let query_email = `SELECT SUM(IF(email=?,1,0)) as email_count, SUM(IF(contact_number=?,1,0)) as cn_count, SUM(IF(username=?,1,0)) as un_count FROM node_backend_users WHERE id !=?`;

            Connection.query(query_email,[args[5],args[4],args[6],args[8]],(err,res) => {
                if (err) throw err;

                let email_count = res[0].email_count;
                let cn_count = res[0].cn_count;
                let un_count = res[0].un_count;
     
                if(email_count<1 && cn_count<1 && un_count<1){
                    let query = `
                        UPDATE node_backend_users 
                        set first_name = ?, last_name=?, address=?, postcode=?, contact_number=?, email=?, username=?, password=?
                        WHERE id = ?
                    `;

                    let bind_data = args

                    Connection.query(query,bind_data, (error, results) => {
                        if (err) throw error;


                        if(results.affectedRows<1){
                            response.status_code = 0;
                            response.message = results.info;
                        }
                        else{
                            response.status_code = 1;
                            response.message = "User successfully updated";
                            response.info = results.info
                        }

                        callback(response);
                    });
            }
            else{
                let warnings = [];

                response.status_code = 0;
                response.message = "Check the data you entered";

                if(email_count>0){
                    warnings.push('Email is already taken.')
                }

                if(cn_count>0){
                    warnings.push('Contact Number is already taken.')
                }

                if(un_count>0){
                    warnings.push('Username is already taken.')
                }

                response.errors = warnings

                callback(response);
            }

            })

        }
        catch(e){
            throw e;
        }

        
    }

    delete_user(args,callback){

        try{
            let response = {};

            let query_email = `DELETE FROM node_backend_users WHERE id = ?`;

            Connection.query(query_email,[args[0]],(err,res) => {
                if (err) throw err;


                if(res.affectedRows<1){
                    response.status_code = 0;
                    response.message = "Fail to delete user";
                }
                else{
                    response.status_code = 1;
                    response.message = "User successfully deleted";
                }

                callback(response);

            })
        }
        catch (e) {
            throw e;
        }
        
    }

    batch_delete_user(args,callback){

        try{

            let response = {};

            let query = `DELETE FROM node_backend_users WHERE id IN (${args})`;

            Connection.query(query,(err,res) => {
                if (err) throw err;

                if(res.affectedRows<1){
                    response.status_code = 0;
                    response.message = "Fail to deleted users";
                }
                else{
                    response.status_code = 1;
                    response.message = "Batch deleted completed";
                }

                callback(response);
            

            })

        }
        catch (e) {
            throw e;
        }

        
    }

}


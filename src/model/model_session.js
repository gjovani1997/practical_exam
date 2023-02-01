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

module.exports =  class Session {

    create_session(args){

        let response = {};

        let query = `
        INSERT INTO node_backend_sessions 
        (token,expiration,user_id)
        VALUES
        (?,?,?)`;

        let bind_data = args

        Connection.query(query,bind_data, (error, results) => {
            if (error) throw error;

           return
        });

        
    }

    async find_token(args,callback){
        
        console.log(args)

        try {

            let query = `SELECT token
            FROM node_backend_sessions 
            WHERE token = ?`;

    
            // Connection.query(query,args,(err, res) => {
            //     if (err) throw err;
    
            //     callback(res[0]);
            // });

            await Connection.execute(query,[args],(err,res)=>{
                callback(res[0]);
            });

            
    
        } catch (err) {
            throw err;
        }
    }

}


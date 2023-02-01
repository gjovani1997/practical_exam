const crypto = require('crypto');
const algorithm = process.env.CRYPTO_HALGO;
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const secretKey = process.env.CRYPTO_SKEY

module.exports =  class Crypto{

    en = text => {
        const iv = crypto.randomBytes(16)
      
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
      
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
      
        // return {
        //   iv: iv.toString('hex'),
        //   content: encrypted.toString('hex')
        // }

        return iv.toString('hex')+":"+encrypted.toString('hex')
      }
      
    dec = hash => {
        hash = hash.split(':');
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash[0], 'hex'))
      
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash[1], 'hex')), decipher.final()])
      
        return decrpyted.toString()
      }

}
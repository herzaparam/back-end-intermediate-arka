const bcrypt = require('bcrypt')
const hashPassword = (password)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async(err, hash)=>{
                if(!err){
                    resolve(hash)
                }else{
                    reject(err)
                }
            })
        })
    })
}

module.exports = {
    hashPassword
}
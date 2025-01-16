const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type: String,
    }, 
    email:{
        type:String
    },
    message:{
        type:String,
    }
})

const UserModel = mongoose.models.user || mongoose.model('user', userSchema)

export default UserModel
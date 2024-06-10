const mongoose = require('mongoose')
const bcrpt = require('bcrypt')//npm install bcrypt(this is for hashing of passwords)
const validator = require('validator')//npm install validator (For validating)

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // if user signup again using same email, mongoose wont allow
    },
    password: {
        type: String,
        required: true
    }
})

// Static Signup method
userSchema.statics.signup = async function (email, password) {

    //validation
    if(!email||!password){

        throw Error('All fields must be filled')

    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }


    const exists = await this.findOne({ email }) // if this email exists

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrpt.genSalt(10)
    const hash = await bcrpt.hash(password,salt)

    const user = await this.create({email,password: hash})
    
    return user
}

// Static Login Method
userSchema.statics.login = async function (email,password){
    if(!email||!password){

        throw Error('All fields must be filled')

    }

    const user = await this.findOne({ email }) // if this user exists

    if (!user) {
        throw Error('Invalid login credentials')
    }

    const match = await bcrpt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    
    return user
}

module.exports = mongoose.model('User', userSchema) 
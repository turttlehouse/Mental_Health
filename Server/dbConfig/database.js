// database connect garna lai mongoose vanne ORM chaiyo so first ma import garne ane tei use garera db connect garne
const mongoose = require('mongoose')
const adminSeeder = require('../adminSeeder')

exports.connectDatabase = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo Database connected successfully")
    adminSeeder();
}
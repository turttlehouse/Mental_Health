const bcrypt = require("bcryptjs");
const User = require("./model/userModel");

const adminSeeder =async()=>{

        const isAdminExists = await User.findOne({email:"admin@gmail.com"})

        if(!isAdminExists)
            {
                await User.create({
                    name: "Admin",
                    email:"admin@gmail.com", 
                    password :bcrypt.hashSync("admin123",10),
                    role : "admin"

                })

                console.log("admin seeded successfully");

            }

            else 
            {
                console.log("admin already seeded");
            }


}

module.exports = adminSeeder


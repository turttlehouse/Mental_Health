const bcrypt = require("bcryptjs");
const User = require("./model/userModel");

const adminSeeder =async()=>{

    // const isAdminExists = await User.findOne({email:"admin@gmail.com"})
    
    // if(!isAdminExists)
    //     {
    //         await User.create({
    //             name: "Admin",
    //             email:"admin@gmail.com", 
    //             password :bcrypt.hashSync("admin123",10),
    //             role : "admin"
    
    //         })
    
    //         console.log("admin seeded successfully");
    
    //     }
    
    //     else 
    //     {
    //         console.log("admin already seeded");
    //     }


    // Array of admin objects
    const admins = [
            { name: "admin", email: "admin@gmail.com", password: "admin123", role: "admin" },
            { name: "admin1", email: "admin1@gmail.com", password: "admin1234", role: "admin" },
        ];

        for (const admin of admins) {

            const isAdminExists = await User.findOne({ email: admin.email });

            if (!isAdminExists) {
            await User.create({
                name: admin.name,
                email: admin.email,
                password: bcrypt.hashSync(admin.password, 10),
                role: admin.role,
            });
            console.log(`${admin.name} seeded successfully`);
            } else {
            console.log(`${admin.name} already seeded`);
            }



        }
}

module.exports = adminSeeder


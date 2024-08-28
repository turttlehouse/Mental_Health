//route handler is a part of the controller that handles the HTTP request for a specific endpoint
//RouteHandler for /register endpoint
//Controller is responsible for handling user input, processing it, and updating the model or triggering a change in the view.
const User = require("../model/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  // console.log(req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required",
    });
  }

  try {
    // Check if the user already exists
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({
      name,  // Include the name field
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }

};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //Asynchronous and non-blocking we can use compareSync for synchronous
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
    // console.log(token);
    res.json({ token, role: user.role, name: user.name }); // Include name in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.logoutUser = async (req, res) => {
//     try {
//         const authHeader = req.headers['authorization'];
//         const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer TOKEN"

//         if (!token) {
//             return res.status(401).json({ message: 'No token provided' });
//         }

//         // Verify the token (optional)
//         jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//             if (err) {
//                 return res.status(403).json({ message: 'Invalid token' });
//             }

//             res.status(200).json({ message: 'Logged out successfully' });
//         });

//     } catch (error) {
//         console.error('Logout error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


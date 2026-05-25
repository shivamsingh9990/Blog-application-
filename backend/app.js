const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const blog = require("./models/blog");
const EmployeeModel = require("./models/Employee"); // <-- Add this

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://blog-application-rosy-gamma.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

const PORT = process.env.PORT;
const Blog = require("./models/blog"); // Make sure this is your blog model
// POST /api/v1/blogs → create a new blog
// Create Blog Route
app.post("/api/v1/blogs", async (req, res) => {
  try {
    const { title, content, author, tags, imageUrl, imageDescription, userEmail } = req.body;
    const blog = await Blog.create({ title, content, author, tags, imageUrl, imageDescription, userEmail });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ msg: "Failed to create blog", error: error.message });
  }
});


// Get all blogs
app.get("/api/v1/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch blogs", error: error.message });
  }
});



// Get Blogs for a specific user
app.get("/api/v1/blogs/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const blogs = await Blog.find({ userEmail: email });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch user blogs", error: error.message });
  }
});

// Update a blog
app.put("/api/v1/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, tags, imageUrl, imageDescription, userEmail } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    if (blog.userEmail !== userEmail) {
      return res.status(403).json({ msg: "Unauthorized to edit this blog" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, tags, imageUrl, imageDescription },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ msg: "Failed to update blog", error: error.message });
  }
});

// Delete a blog
app.delete("/api/v1/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userEmail } = req.body; // Assuming userEmail is sent in body for auth

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    if (blog.userEmail !== userEmail) {
      return res.status(403).json({ msg: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ msg: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: "Failed to delete blog", error: error.message });
  }
});


// Registration route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    // Check if user already exists
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Create new user
    const employee = await EmployeeModel.create({ name, email, password });
    
    // Remove password from response
    const userResponse = employee.toObject();
    delete userResponse.password;

    res.status(201).json({ msg: "Registration successful", user: userResponse });
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ msg: messages[0] });
    }
    
    res.status(400).json({ msg: "Registration failed", error: err.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // Find user and include password (it's hidden by default)
    const user = await EmployeeModel.findOne({ email }).select("+password");
    
    if (!user) {
      return res.status(404).json({ msg: "No record existed" });
    }

    // Compare passwords
    const isPasswordCorrect = await user.comparePassword(password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "The password is incorrect" });
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ msg: "success", user: userResponse });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
});

// ...your blog routes...

const start = async () => {
  try {
    await connectDB();
    console.log(`Connected to DATABASE at ${mongoose.connection.host}`);
    app.listen(PORT, () => {
      console.log(`Server is Listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
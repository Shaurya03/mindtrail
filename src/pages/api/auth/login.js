import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function loginUser(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const connect = await connectDB();

    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is missing" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is missing" });
    }

    const lookUpUser = await User.findOne({ email });

    if (lookUpUser === null) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = lookUpUser;

    const compare = await bcrypt.compare(password, user.passwordHash);

    if (!compare) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({ token, id: user._id, email: user.email });

  } catch (error) {
    return res.status(500).json({ error: "Login failed. Please try again." });
  }

};

export default loginUser;
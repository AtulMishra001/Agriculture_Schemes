import User from "../models/Users.js"
import { hash, compare } from "bcryptjs"
import { generateToken } from "../utils/token.js"
import cookie from "cookie"
import jwt from "jsonwebtoken"
import logger from "../utils/logger.js"

export async function registerUser(req, res) {
  try {
    const { name, email, password, phone } = req.body


    const existingUser = await User.findOne({ email })
    if (existingUser){
      logger.warn(`Registration failed user already exists: : ${email}`)
      return res.status(400).json({ message: "User already exists" })}

    const hashedPassword = await hash(password, 10)

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    })

    await newUser.save()

    const token = generateToken(newUser)
    res.setHeader("Set-Cookie", cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/"
    }));
    logger.info(`User registered successfully: ${email}`)
    res.status(201).json({ user: newUser})
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body


    const user = await User.findOne({ email })
    if (!user) {
      logger.warn(`User login Failed: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" })}

    const isMatch = await compare(password, user.password)
    if (!isMatch){
      logger.warn(`Login Failed invalid password: ${email}`)
      return res.status(400).json({ message: "Invalid password" })}

    if(user.role === "admin") return res.status(403).json({message: "you are an admin please login through admin pannel"})

    const token = generateToken(user)
     res.setHeader("Set-Cookie", cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/"
    }));
    logger.info(`user login successfull: ${user.name}`)
    res.status(200).json({user})
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}


export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Admin login failed: No user found with email: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Admin login failed: Incorrect password for email: ${email}`);
      return res.status(400).json({ message: "Invalid Password" });
    }

    if (user.role !== "admin") {
      logger.warn(`Unauthorized login attempt by non-admin user: ${email}`);
      return res.status(403).json({ message: "Forbidden: Access denied, not an Admin" });
    }

    const token = generateToken(user);

    res.setHeader("Set-Cookie", cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    }));

    logger.info(`✅ Admin login successful: ${user.name} (${email})`);
    res.status(200).json({ user });

  } catch (err) {
    logger.error(`🔥 Admin login error for ${req.body.email || "unknown"}: ${err.message}`);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}


export function handler(req, res) {
  try {
    const token = req.cookies.token;
    console.log("Cookies received:", req.headers.cookie);
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ userId: decoded.id, role: decoded.role, name: decoded.name, email: decoded.email });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export function logout(req, res) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.setHeader("Set-Cookie", cookie.serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    expires: new Date(0),
    path: "/"
  }));
  logger.info(`logout successfull: ${decoded.email}`)
  res.status(200).json({ message: "Logged out successfully" });
}
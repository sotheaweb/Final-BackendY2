import { registerUserService, loginUserService } from '../services/userService.js';

export const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { token, user } = await loginUserService(req.body);
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error: error.message });
  }
};

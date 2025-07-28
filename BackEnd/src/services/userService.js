import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/userRepository.js";

export const registerUserService = async ({ first_name, last_name, username, email, phonenumber, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser({
    first_name,
    last_name,
    username,
    email,
    phone_number: phonenumber,
    password: hashedPassword,
  });

  return user;
};

export const loginUserService = async ({ username, password }) => {
  const user = await userRepo.findUserByUsername(username);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  const { password: _, ...userData } = user.toJSON();

  return { token, user: userData };
};

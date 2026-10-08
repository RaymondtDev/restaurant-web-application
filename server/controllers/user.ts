import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { USER_ACCESS_TOKEN_SECRET_KEY, USER_REFRESH_TOKEN_SECRET_KEY } from "../config/jwt";
import { UserPayload } from "../types/express";
import User from "../models/User";

export const CheckUser = async (req: Request, res: Response) => {
  const accessToken = req.cookies?.userAccessToken;
  const refreshToken = req.cookies?.userRefreshToken;

  // check if access and refresh token exist
  if (!accessToken && !refreshToken) return res.status(401).json({ success: false, message: "No user session found." });

  // if access token exists, verify jwt token and return payload
  if (accessToken) {
    const decoded = JWT.verify(accessToken, USER_ACCESS_TOKEN_SECRET_KEY) as UserPayload;

    req.user = decoded;

    return res.status(400).json({ success: true, user: decoded });
  }
  if (!refreshToken) return res.status(401).json({ success: false, message: "Session expired. Please log in again" });

  // if refresh token exist but not access token, create new access token
  try {
    const decoded = JWT.verify(refreshToken, USER_REFRESH_TOKEN_SECRET_KEY) as UserPayload;

    // create new access token
    const newAccessToken = JWT.sign(
      {
        id: decoded.id,
        name: decoded.name,
        surname: decoded.surname,
        username: decoded.username,
        cart: decoded.cart
      },
      USER_ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "24h"
      }
    );

    // save new access token in a cookie
    res.cookie("userAccessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    req.user = decoded;

    res.status(200).json({ success: true, user: decoded, accessTokenRefreshed: true });
  } catch (error) {
    console.error("An Error Occured When User Auth Refresh:", error);
    res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
  }
}

export const CreateUser = async (req: Request, res: Response) => {
  const { name, surname, username, email, phone, password } = req.body as {
    name: string,
    surname: string,
    username: string,
    email: string,
    phone: string,
    password: string
  }

  try {
    // check if user with email exists
    const userEmail = await User.findOne({ email });
    if (userEmail) return res.status(400).json({ success: false, validationError: true, message: "Email associated with another account" });

    // check if user with username exists
    const userUsername = await User.findOne({ username });
    if (userUsername) return res.status(400).json({ success: false, validationError: true, message: "Username associated with another account" });

    // check if user with phone exists
    const userPhone = await User.findOne({ phone });
    if (userPhone) return res.status(400).json({ success: false, validationError: true, message: "Phone number associated with another account" });

    const user = new User({ name, surname, username, email, phone });
    await user.setPassword(password);

    await user.save();

    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("An Error Occured When Creating User:", error);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
}

export const UserLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string, password: string };
  const USER_ACCESS_TOKEN_SECRET = process.env.USER_ACCESS_TOKEN_SECRET as string;
  const USER_REFRESH_TOKEN_SECRET = process.env.USER_REFRESH_TOKEN_SECRET as string;

  try {
    if (!email) return res.status(400).json({ success: false, validationError: true, message: "Email required" });
    if (!password) return res.status(400).json({ success: false, validationError: true, message: "Passoword required" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, validationError: true, message: "User not found" });

    const validated = await user.validatePassword(password);
    if (!validated) return res.status(401).json({ success: false, validationError: true, message: "Invalid email or password" });

    const accessToken = JWT.sign(
      {
        id: user._id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        cart: user.cart
      },
      USER_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h"
      }
    );
    const refreshToken = JWT.sign(
      {
        id: user._id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        cart: user.cart
      },
      USER_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d"
      }
    );

    res.cookie("userAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.cookie("userRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({ success: true, message: "User logged in successfully", user: { id: user._id, name: user.name, surname: user.surname, username: user.username, cart: user.cart } });
  } catch (error) {
    console.error("An Error Occured When Logging In User:", error);
    res.status(500).json({ success: false, message: "Failed to log in user" });
  }
}

export const UserLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("userAccessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });
    res.clearCookie("userRefreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("An Error Occurred When User Logout:", error);
    return res.status(500).json({ message: "Logout User server error", error })
  }
}

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("An Error Occured When Fetching Users:", error);
    res.status(500).json({ message: "Failed to fetch users", error: error });
  }
}
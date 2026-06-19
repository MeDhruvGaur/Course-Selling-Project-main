import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import jwt from "jsonwebtoken";

// ==========================
// Generate Access & Refresh Token
// ==========================
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
      validateBeforeSave: false,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating tokens"
    );
  }
};

function ApiErrorHandler(res, statusCode, message) {
  res.status(statusCode).json({
    message,
  });

  throw new ApiError(statusCode, message);
}

// ==========================
// Register User
// ==========================
const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    fullName,
    email,
    password,
    description,
    role,
  } = req.body;

  if (
    !username ||
    !fullName ||
    !email ||
    !password
  ) {
    throw new ApiError(400, "All required fields are mandatory");
  }

  if (!email.includes("@")) {
    throw new ApiError(400, "Invalid email");
  }

  const existedUser = await User.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const cart = await Cart.create({
    courses: [],
  });

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    description,
    role: role || "Student",
    cart: cart._id,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      createdUser,
      "User registered successfully"
    )
  );
});

// ==========================
// Login User
// ==========================
const loginUser = asyncHandler(async (req, res) => {
  const {
    email,
    username,
    password,
  } = req.body;

  if ((!email && !username) || !password) {
    throw new ApiError(
      400,
      "Email/Username and password are required"
    );
  }

  const user = await User.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });

  if (!user) {
    ApiErrorHandler(
      res,
      404,
      "User not found"
    );
  }

  const isPasswordCorrect =
    await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    ApiErrorHandler(
      res,
      401,
      "Invalid credentials"
    );
  }

  const {
    accessToken,
    refreshToken,
  } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(
    user._id
  ).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .cookie(
      "accessToken",
      accessToken,
      options
    )
    .cookie(
      "refreshToken",
      refreshToken,
      options
    )
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "Login successful"
      )
    );
});

// ==========================
// Logout
// ==========================
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie(
      "accessToken",
      options
    )
    .clearCookie(
      "refreshToken",
      options
    )
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Logged out successfully"
      )
    );
});

// ==========================
// Refresh Token
// ==========================
const refreshAccessToken = asyncHandler(
  async (req, res) => {
    const incomingRefreshToken =
      req.cookies.refreshToken ||
      req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(
        401,
        "Unauthorized request"
      );
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user =
      await User.findById(
        decodedToken._id
      );

    if (!user) {
      throw new ApiError(
        401,
        "Invalid refresh token"
      );
    }

    if (
      incomingRefreshToken !==
      user.refreshToken
    ) {
      throw new ApiError(
        401,
        "Refresh token expired"
      );
    }

    const {
      accessToken,
      refreshToken,
    } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .cookie(
        "accessToken",
        accessToken,
        options
      )
      .cookie(
        "refreshToken",
        refreshToken,
        options
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Access token refreshed"
        )
      );
  }
);

// ==========================
// Change Password
// ==========================
const changeCurrentPassword =
  asyncHandler(async (req, res) => {
    const {
      oldPassword,
      newPassword,
    } = req.body;

    const user =
      await User.findById(
        req.user._id
      );

    const isPasswordCorrect =
      await user.isPasswordCorrect(
        oldPassword
      );

    if (!isPasswordCorrect) {
      throw new ApiError(
        401,
        "Current password is incorrect"
      );
    }

    user.password = newPassword;

    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "Password changed successfully"
        )
      );
  });

// ==========================
// Get Current User
// ==========================
const getCurrentUser =
  asyncHandler(async (req, res) => {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          req.user,
          "Current user fetched successfully"
        )
      );
  });

// ==========================
// Update Account
// ==========================
const updateAccountDetails =
  asyncHandler(async (req, res) => {
    const {
      fullName,
      email,
      description,
    } = req.body;

    const updatedUser =
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            fullName,
            email,
            description,
          },
        },
        {
          new: true,
        }
      ).select("-password -refreshToken");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedUser,
          "Account updated successfully"
        )
      );
  });

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
};

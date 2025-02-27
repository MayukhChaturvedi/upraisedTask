import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await prisma.user.findUnique({
		where: { email: email },
		select: { id: true, email: true, password: true },
	});
	if (!user) {
		throw createError(404, "User not found");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw createError(401, "Invalid credentials");
	}
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
	res.status(200).json({ token });
});

export const signup = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body;
	const user = await prisma.user.findUnique({ where: { email: email } });
	if (user) {
		throw createError(400, "User already exists");
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	await prisma.user.create({
		data: {
			email: email,
			name: name,
			password: hashedPassword,
		},
	});
	res.status(201).json({ message: "User created" });
});

export const isAuthenticated = asyncHandler(async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	if (!token) {
		throw createError(401, "Unauthorized");
	}
	try {
		if (!decoded.id) {
			req.user = await prisma.user.findUnique({
				where: { id: decoded.id },
				select: { id: true },
			});
		}
		req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
		if (!req.user) {
			throw createError(404, "User not found");
		}
		next();
	} catch (err) {
		throw createError(401, "Invalid or expired token");
	}
});

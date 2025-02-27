import prism from "../prismaClient.js";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

export const getGadgets = asyncHandler(async (req, res) => {
	const { page = 1, limit = 10 } = req.query;
	const [gadgets, total] = await Promise.all([
		prism.gadget.findMany({
			skip: (page - 1) * limit,
			take: limit,
		}),
		prism.gadget.count(),
	]);
	gadgets.forEach((gadget) => {
		gadget.success = Math.ceil(Math.random() * 100);
	});
	res.status(200).json({
		gadgets,
		pagination: {
			page,
			limit,
			total: total,
			totalPages: Math.ceil(total / limit),
		},
	});
});

export const createGadget = asyncHandler(async (req, res) => {
	const gadgetNames = [
		"The Kraken",
		"The Nightingale",
		"The Dragon",
		"The Phoenix",
		"The Unicorn",
		"The Griffin",
		"The Hydra",
		"The Pegasus",
		"The Chimera",
		"The Minotaur",
	];
	if (!req.body.name) {
		req.body.name =
			gadgetNames[Math.floor(Math.random() * gadgetNames.length)] +
			" " +
			Math.floor(Math.random() * 1000);
	}
	const gadget = await prism.gadget.create({ data: req.body });
	res.status(201).json(gadget);
});

export const updateGadget = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const gadget = await prism.gadget.update({
		where: { id: id },
		data: req.body,
	});
	res.status(200).json(gadget);
});

export const deleteGadget = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const gadget = await prism.gadget.update({
		where: {
			id: id,
			status: {
				in: ["Available", "Deployed"],
			},
		},
		data: {
			status: "Decommissioned",
			decommissionedAt: new Date(),
		},
	});
	res.status(200).json(gadget);
});

export const selfDestruct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const code = req.body.code;
	if (!code || code != "selfDestruct") {
		throw createError(403, "Code is incorrect or not provided");
	}
	const gadget = await prism.gadget.update({
		where: {
			id: id,
			status: {
				in: ["Available", "Decommissioned", "Deployed"],
			},
		},
		data: {
			status: "Destroyed",
		},
	});
	res.status(200).json(gadget);
});

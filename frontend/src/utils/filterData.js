const continents = [
	{ _id: 1, name: "Africa" },
	{ _id: 2, name: "Europe" },
	{ _id: 3, name: "Asia" },
	{ _id: 4, name: "North America" },
	{ _id: 5, name: "South America" },
	{ _id: 6, name: "Australia" },
	{ _id: 7, name: "Antarctica" },
];

const prices = [
	{ _id: 0, name: "All", array: [] },
	{ _id: 1, name: "$0 ~ $99", array: [0, 99] },
	{ _id: 2, name: "$100 ~ $299", array: [100, 299] },
	{ _id: 3, name: "$300 ~ $499", array: [300, 499] },
	{ _id: 4, name: "$500 ~ $699", array: [500, 699] },
	{ _id: 5, name: "over $700", array: [700, 5000] },
];

export { continents, prices };

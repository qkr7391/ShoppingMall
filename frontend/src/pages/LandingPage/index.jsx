import React, { useEffect, useState } from "react";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import axiosInstance from "../../utils/axios";
// import {continents, prices} from '../../utils/'

const LandingPage = () => {
	const limit = 4;
	const [products, setProducts] = useState([]);
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [filters, setFilters] = useState({
		continents: [],
		prices: [],
	});

	useEffect(() => {
		fetchProducts({ skip, limit });
	}, []);

	const fetchProducts = async ({
		skip,
		limit,
		loadMore = false,
		filters = {},
		searchTerm = "",
	}) => {
		const params = {
			skip,
			limit,
			filters,
			searchTerm,
		};
		try {
			const response = await axiosInstance.get("/products", { params });
			if (loadMore) {
				setProducts((prevProducts) => [
					...prevProducts,
					...response.data.products,
				]);
			} else {
				setProducts(response.data.products);
			}
			setHasMore(response.data.hasMore);
		} catch (error) {
			console.error(error);
		}
	};

	const handleLoadMore = () => {
		const newSkip = skip + limit;
		const body = {
			skip: newSkip,
			limit,
			loadMore: true,
			filters,
		};
		fetchProducts(body);
		setSkip(newSkip);
	};

	return (
		<section>
			<div className="text-center m-7">
				<h2 className="text-2xl">Travel Products</h2>
			</div>
			{/* filter */}
			<div className="flex gap-3">
				<div className="w-1/2">
					<CheckBox />
				</div>
				<div className="w-1/2">
					<RadioBox />
				</div>
			</div>
			{/* Search */}
			<div className="flex justify-end mb-3">
				<SearchInput />
			</div>
			{/* Card */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{products.map((product) => (
					<CardItem product={product} key={product._id} />
				))}
			</div>
			{/* load more */}
			{hasMore && (
				<div className="flex justify-center mt-5">
					<button
						onClick={handleLoadMore}
						className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
					>
						more
					</button>
				</div>
			)}
		</section>
	);
};

export default LandingPage;

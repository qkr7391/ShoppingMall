import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ImageSlider from "../../../components/ImageSlider";

function CardItem({ product }) {
	return (
		<div className="border-[1px] border-gray-300">
			<ImageSlider images={product.images} />
			<Link to={`/product/${product._id}`}>
				<p className="p-1">{product.continents}</p>
				<p className="p-1">{product.title}</p>
				<p className="p-1 text-xs text-gray-500">CAD ${product.price}</p>
			</Link>
		</div>
	);
}

CardItem.propTypes = {
	product: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		continents: PropTypes.number.isRequired, // Assuming continents is a number based on userSchema
		price: PropTypes.number.isRequired,
		images: PropTypes.arrayOf(PropTypes.string).isRequired,
	}).isRequired,
};

export default CardItem;

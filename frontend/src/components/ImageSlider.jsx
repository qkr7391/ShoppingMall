import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";

function ImageSlider({ images }) {
	return (
		<Carousel autoPlay showThumbs={false} infiniteLoop>
			{images.map((image) => (
				<div key={image} style={{ maxHeight: "100px" }}>
					<img
						src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
						alt={image}
						className="w-full h-full object-cover"
					/>
				</div>
			))}
		</Carousel>
	);
}

ImageSlider.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;

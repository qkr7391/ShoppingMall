import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

const FileUpload = ({ onImageChange, images }) => {
	const handleDrop = async (files) => {
		let formData = new FormData();

		const config = { header: { "content-type": "multipart/form-data" } };

		formData.append("file", files[0]);

		try {
			const response = await axiosInstance.post(
				"/products/image",
				formData,
				config
			);
			onImageChange([...images, response.data.fileName]);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};
	const handleDelete = (image) => {
		const currentIndex = images.indexOf(image);
		let newImages = [...images];
		newImages.splice(currentIndex, 1);
		onImageChange(newImages);
	};

	return (
		<div className="flex gap-4 ">
			<Dropzone onDrop={handleDrop}>
				{({ getRootProps, getInputProps }) => (
					<section className="min-w-[300px] h-[300px] border flex items-center justify-center">
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p className="text-3xl">+</p>
						</div>
					</section>
				)}
			</Dropzone>

			<div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
				{images.map((image, index) => (
					<div key={index} onClick={handleDelete}>
						<img
							className="min-w-[300px] h-[300px]"
							src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
							alt={`Image ${index}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

FileUpload.propTypes = {
	onImageChange: PropTypes.func.isRequired,
	images: PropTypes.array.isRequired,
};

export default FileUpload;

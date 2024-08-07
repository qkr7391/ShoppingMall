import React from "react";
import PropTypes from "prop-types";

function CheckBox({ continents, checkedContinents, onFilters }) {
	const handleToggle = (continentId) => {
		const currentIndex = checkedContinents.indexOf(continentId);

		const newChecked = [...checkedContinents];

		if (currentIndex === -1) {
			newChecked.push(continentId);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		onFilters(newChecked);
	};

	return (
		<div className="p-2 mb-3 bg-gray-100 rounded-md">
			{continents?.map((continent) => (
				<div key={continent._id}>
					<input
						type="checkbox"
						onChange={() => handleToggle(continent._id)}
						checked={checkedContinents.indexOf(continent._id) !== -1}
					/>{" "}
					<label>{continent.name}</label>
				</div>
			))}
		</div>
	);
}

CheckBox.propTypes = {
	continents: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
	checkedContinents: PropTypes.arrayOf(PropTypes.number).isRequired,
	onFilters: PropTypes.func.isRequired,
};

export default CheckBox;

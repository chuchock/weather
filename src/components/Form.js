import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';


const Form = ({ search, saveSearch, saveConsult, textButton, saveTextButton }) => {

	const [error, saveError] = useState(false);

	// extraer ciudad y pais
	const { city, country } = search;

	// función que coloca los elementos en el state
	const handleChange = e => {
		saveSearch({
			...search,
			[e.target.name]: e.target.value
		});
	}

	// Cuando el usuario da submit al form
	const handleSubmit = e => {
		e.preventDefault();

		if (city.trim() === '' || country.trim() === '') {
			saveError(true);
			return;
		}

		saveTextButton('Searching...')

		saveError(false);

		saveConsult(true);
	}

	return (
		<form
			onSubmit={handleSubmit}
		>
			{error ? <Error message="All fields are required" /> : null}

			<div className="input-field col s12">
				<input
					type="text"
					name="city"
					id="city"
					value={city}
					onChange={handleChange}
				/>
				<label htmlFor="city">city: </label>
			</div>

			<div className="input-field col s12">
				<select
					name="country"
					id="country"
					value={country}
					onChange={handleChange}
				>
					<option value="">-- Choose a country --</option>
					<option value="US">Estados Unidos</option>
					<option value="MX">México</option>
					<option value="AR">Argentina</option>
					<option value="CO">Colombia</option>
					<option value="CR">Costa Rica</option>
					<option value="ES">España</option>
					<option value="PE">Perú</option>
				</select>
				<label htmlFor="country">Country: </label>
			</div>

			<div className="input-field col s12">
				<input
					type="submit"
					value={textButton}
					className="waves-effect waves-light btn-large btn-block yellow accent-4"
				/>
			</div>
		</form>

	);
}

Form.propTypes = {
	search: PropTypes.object.isRequired,
	saveSearch: PropTypes.func.isRequired,
	saveConsult: PropTypes.func.isRequired
}

export default Form;
import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

function App() {
	const [search, saveSearch] = useState({
		city: '',
		country: ''
	});

	const { city, country } = search;

	const [consult, saveConsult] = useState(false);

	const [result, saveResult] = useState({});

	const [error, saveError] = useState(false);

	const [textButton, saveTextButton] = useState("Search");

	useEffect(() => {
		const callApi = async () => {
			if (consult) {

				const appId = 'f08c3ba0dee49ccaa0699c0bff159e3d';
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

				const response = await fetch(url)
				if (response.status >= 200 && response.status <= 299) {
					const result = await response.json();

					saveResult(result);
					saveConsult(false);

					saveTextButton('Search');

					// Detecta si hubo resultados correctos en la consulta
					if (result.cod === "404") {
						saveError(true);
					} else {
						saveError(false);
						saveTextButton('Search');
					}
				} else {
					saveConsult(false);
					saveError(true);
					console.log(response.status, response.statusText);
					saveTextButton('Search');
				}
			}
		}

		callApi();
		// eslint-disable-next-line
	}, [consult])

	let component;
	if (error) {
		component = <Error message="No results" />
	} else {
		component = <Weather
			result={result}
		/>
	}

	return (
		<Fragment>
			<Header
				title='React Weather'
			/>

			<div className="contenedor-form">
				<div className="container">
					<div className="row">
						<div className="col m6 s12">
							<Form
								search={search}
								saveSearch={saveSearch}
								saveConsult={saveConsult}
								textButton={textButton}
								saveTextButton={saveTextButton}
							/>
						</div>
						<div className="col m6 s12">
							{component}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;

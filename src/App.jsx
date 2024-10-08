import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Header from './components/header.jsx';
import ForesightController from './components/foresight/foresightController.jsx';

import './main.css';

export default function App() {
	const [player, setPlayer] = useState('player2');
	const [teams, setTeams] = useState({  });
	const [games, setGames] = useState({  });

	useEffect(() => {
		Axios.get('http://localhost:3000/api/games/2024')
		.then((res) => {
			setGames(res.data);

		})
		.catch((err) => {
			console.error(err);
		});

		Axios.get('http://localhost:3000/api/teams')
		.then((res) => {
			setTeams(res.data);

		})
		.catch((err) => {
			console.error(err);
		});

	}, []);

	return (

		<>
			<Header />

			<div className="content">

				<ForesightController
					player={ player }
					teams={ teams }
					games={ games }
				/>

			</div>

		</>

	);

}

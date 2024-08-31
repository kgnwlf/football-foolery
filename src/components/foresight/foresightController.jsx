import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Dashboard from './components/dashboard.jsx';
import GameGrid from './components/gameGrid.jsx';

import './foresight.css';

export default function ForesightController ({ teams, games }) {
	const [playerPredictions, setPlayerPredictions] = useState([  ]);
	const [board, setBoard] = useState('regularSeason'); // Set default to which ever is closest.
	const [boardGames, setBoardGames] = useState([  ]);

	const [view, setView] = useState('game-view');
	const [viewWeeks, setViewWeeks] = useState([]);
	const [viewWeek, setViewWeek] = useState(1);
	const [viewTeam, setViewTeam] = useState('ARI');

	useEffect(() => {
		if (!board || !games[board]) {
			return;
		}

		setBoardGames(games[board]);

		let weeksAvailableInBoard = [ ...games[board] ].map((game) => game.week);

		weeksAvailableInBoard = new Set([ ...weeksAvailableInBoard ]);
		weeksAvailableInBoard = [ ...weeksAvailableInBoard ];

		setViewWeeks(weeksAvailableInBoard);

	}, [games, board]);

	useEffect(() => {
		Axios.get('http://localhost:3000/api/gameSheet/2024/player1/footballForesight/regularSeason')
		.then((res) => {
			setPlayerPredictions(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	return (

		<div className="foresight-container">

			<Dashboard
				setBoard={ setBoard }
				view={ view }
				setView={ setView }
				viewWeeks={ viewWeeks }
				setViewWeek={ setViewWeek }
				teams={ teams }
				setViewTeam={ setViewTeam }
			/>

			<GameGrid
				teams={ teams }
				boardGames={ boardGames }
				playerPredictions={ playerPredictions }
				view={ view }
				viewWeek={ viewWeek }
				viewTeam={ viewTeam }
			/>

		</div>

	);

}

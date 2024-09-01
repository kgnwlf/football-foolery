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

		Axios.get(`http://localhost:3000/api/gameSheet/2024/player2/footballForesight/${ board }`)
		.then((res) => {
			setPlayerPredictions(res.data);
		})
		.catch((err) => {
			console.log(err);
		});

		setBoardGames(games[board]);

		let weeksAvailableInBoard = [ ...games[board] ].map((game) => game.week);

		weeksAvailableInBoard = new Set([ ...weeksAvailableInBoard ]);
		weeksAvailableInBoard = [ ...weeksAvailableInBoard ];

		setViewWeeks(weeksAvailableInBoard);

	}, [games, board]);

	let saveGameSheet = (submit = false) => {
		let payload = {
			player: 'player2',
			gameMode: 'footballForesight',
			board: board,
			gameSheet: playerPredictions,
		}

		if (submit) {
			payload['submitted'] = true;
		}

		Axios.put('http://localhost:3000/api/gameSheet/', payload)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.error(err);
		});

	}

	return (

		<div className="foresight-container">

			<Dashboard
				setBoard={ setBoard }
				boardGames={ boardGames }
				playerPredictions={ playerPredictions }
				view={ view }
				setView={ setView }
				viewWeeks={ viewWeeks }
				setViewWeek={ setViewWeek }
				teams={ teams }
				viewTeam={ viewTeam }
				setViewTeam={ setViewTeam }
				saveGameSheet={ saveGameSheet }
			/>

			<GameGrid
				teams={ teams }
				boardGames={ boardGames }
				playerPredictions={ playerPredictions }
				setPlayerPredictions={ setPlayerPredictions }
				view={ view }
				viewWeek={ viewWeek }
				viewTeam={ viewTeam }
			/>

		</div>

	);

}

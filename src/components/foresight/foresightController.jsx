import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import PlayoffSeeding from './components/playoffSeeding.jsx';
import Dashboard from './components/dashboard.jsx';
import GameGrid from './components/gameGrid.jsx';

import { seedConferences } from './components/seedingFunctions.js';

import './foresight.css';

export default function ForesightController ({ player, teams, games }) {
	const [allPlayerPredictions, setAllPlayerPredictions] = useState({  });
	const [playerPredictions, setPlayerPredictions] = useState([  ]);
	const [board, setBoard] = useState('regularSeason'); // Set default to which ever is closest.
	const [boardGames, setBoardGames] = useState([  ]);

	const [view, setView] = useState('game-view');
	const [viewWeeks, setViewWeeks] = useState([]);
	const [viewWeek, setViewWeek] = useState(1);
	const [viewTeam, setViewTeam] = useState('ARI');

	useEffect(() => {
		if (!board) {
			return;
		}

		console.log(`Getting ${ player }'s ${ board } predictions...`);

		Axios.get(`http://localhost:3000/api/gameSheet/2024/${ player }/footballForesight`)
		.then((res) => {
			setAllPlayerPredictions(res.data)
		})
		.catch((err) => {
			console.log(err);
		});

	}, []);

	useEffect(() => {
		if (!board || !games[board] || !allPlayerPredictions[board]) {
			return;
		}

		setBoardGames(games[board]);
		setPlayerPredictions(allPlayerPredictions[board]);
		setViewWeeks(getAvailableWeeks());

	}, [board, games, allPlayerPredictions]);

	let getAvailableWeeks = () => {
		let weeksAvailableInBoard = [ ...games[board] ].map((game) => game.week);

		weeksAvailableInBoard = new Set([ ...weeksAvailableInBoard ]);
		weeksAvailableInBoard = [ ...weeksAvailableInBoard ];

		return weeksAvailableInBoard;
	}

	let saveGameSheet = (submit = false) => {
		let payload = {
			player: player,
			gameMode: 'footballForesight',
			board: board,
			gameSheet: playerPredictions,
		}

		if (submit) {
			payload['submitted'] = true;

			if (board === 'regularSeason') {
				let [ nfc, afc ] = seedConferences(boardGames, teams, playerPredictions);

				payload.gameSheet.nfcSeeding = {
					first: nfc[0],
					second: nfc[1],
					third: nfc[2],
					fourth: nfc[3],
					fifth: nfc[4],
					sixth: nfc[5],
					seventh: nfc[6],
				}

				payload.gameSheet.afcSeeding = {
					first: afc[0],
					second: afc[1],
					third: afc[2],
					fourth: afc[3],
					fifth: afc[4],
					sixth: afc[5],
					seventh: afc[6],
				}

			}

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

		<>

			{

				!board || !games[board] || !allPlayerPredictions[board]

				?

				null

				:

				<div className="foresight-container">

					<PlayoffSeeding
						boardGames={ boardGames }
						teams={ teams }
						playerPredictions={ playerPredictions }
					/>

					<Dashboard
						setBoard={ setBoard }
						games={ games }
						boardGames={ boardGames }
						allPlayerPredictions={ allPlayerPredictions }
						playerPredictions={ playerPredictions }
						view={ view }
						setView={ setView }
						viewWeeks={ viewWeeks }
						viewWeek={ viewWeek }
						setViewWeek={ setViewWeek }
						teams={ teams }
						viewTeam={ viewTeam }
						setViewTeam={ setViewTeam }
						saveGameSheet={ saveGameSheet }
					/>

					<GameGrid
						teams={ teams }
						board={ board }
						boardGames={ boardGames }
						playerPredictions={ playerPredictions }
						setPlayerPredictions={ setPlayerPredictions }
						view={ view }
						viewWeek={ viewWeek }
						viewTeam={ viewTeam }
					/>

				</div>

			}

		</>

	);

}

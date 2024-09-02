import React, { useEffect, useState } from 'react';

export default function Game ({ game, teams, board, playerPredictions, setPlayerPredictions }) {
	const [primetimeInfo, setPrimetimeInfo] = useState('');
	const [stadium, setStadium] = useState('');
	const [time, setTime] = useState('');

	const [winningTeam, setWinningTeam] = useState('');

	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	useEffect(() => {
		setPrimetimeInfo(determinePrimetime());
		setStadium(determineStadium());
		setTime(determineTime());

	}, []);

	useEffect(() => {
		if (playerPredictions[game.gameID]?.tie) {
			setWinningTeam('');

			return;

		}

		if (playerPredictions[game.gameID]?.homeWin) {
			setWinningTeam('homeWin');

			return;

		}

		if (playerPredictions[game.gameID]?.awayWin) {
			setWinningTeam('awayWin');

			return;

		}

	}, [playerPredictions, game]);


	let updateWinner = (e) => {
		let findOtherTeam = {
			'homeWin': 'awayWin',
			'awayWin': 'homeWin'
		};

		let playerPredictionsCopy = { ...playerPredictions };

		if (!playerPredictionsCopy[game.gameID]) {
			playerPredictionsCopy[game.gameID] = {
				homeWin: false,
				awayWin: false,
				tie: false
			}
		}

		let toggledTeam = e.target.id;
		let toggledTeamStatus = playerPredictionsCopy[game.gameID][toggledTeam];

		let otherTeam =  findOtherTeam[toggledTeam];
		let otherTeamStatus = playerPredictionsCopy[game.gameID][otherTeam];

		if (toggledTeamStatus) {
			playerPredictionsCopy[game.gameID][toggledTeam] = false;

			return;

		}

		playerPredictionsCopy[game.gameID][toggledTeam] = true;

		setWinningTeam(toggledTeam);

		if (otherTeamStatus) {
			playerPredictionsCopy[game.gameID][otherTeam] = false;

		}

		setPlayerPredictions(playerPredictionsCopy);

	}

	let determinePrimetime = () => {
		if (game.primetime) { // Get in US time incase player is outside the US.
			return `${ days[new Date(new Date(game.time).toLocaleString("en-US")).getDay()] } Night Football`;
		}

		return null;

	}

	let determineStadium = () => {
		if (game.international) {
			return game.gameDetails.stadium;
		}

		return teams[game.home.team].stadium;
	}

	let determineTime = () => {
		let date = new Date(game.time);
		let dateString = date.toLocaleString('default', { weekday: "long", year: "numeric", month: "long", day: "numeric" });
		let hours = date.getHours();

		let time = date.toLocaleString().split(', ');
		time = time[1].split(':00 ').join(' ');

		if (hours === 0) {
			time = 'TBD';
		}

		return `${ dateString }, ${ time }`;

	}

	return (

		<div className="game-card-grid">

			<div className="primetime-game">{ primetimeInfo }</div>

			<div
				className="game-card"
				onClick={ () => console.log(playerPredictions[game.gameID]) }
			>

				<span
					id="awayWin"
					className={ `team clickable${ winningTeam === 'homeWin' ? ' losing-team' : '' }` }
					onClick={ updateWinner }
					style={{
						'background': `${ teams[game.away.team].primaryColor }`,
						'border': `4px solid ${ teams[game.away.team].secondaryColor }`
					}}
				>

					{ game.away.team }

				</span>

				<span
					id="homeWin"
					className={ `team clickable${ winningTeam === 'awayWin' ? ' losing-team' : '' }` }
					onClick={ updateWinner }
					style={{
						'background': `${ teams[game.home.team].primaryColor }`,
						'border': `4px solid ${ teams[game.home.team].secondaryColor }`
					}}
				>

					{ game.home.team }

				</span>

			</div>

			<div className="game-tie">

				{

					board === 'postSeason'

					?

					null

					:

					'TIE'

				}


			</div>

			<div className="game-time-stadium-card">

				<div className="auto-x-margins">{ time }</div>
				<div className="auto-x-margins">@{ stadium }</div>

			</div>

		</div>

	);

}

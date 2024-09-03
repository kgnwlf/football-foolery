import React, { useEffect, useState } from 'react';

export default function Game ({ key, game, teams, board, playerPredictions, setPlayerPredictions }) {
	const [primetimeInfo, setPrimetimeInfo] = useState('');
	const [stadium, setStadium] = useState('');
	const [time, setTime] = useState('');

	const [outcome, setOutcome] = useState('');

	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	useEffect(() => {
		setPrimetimeInfo(determinePrimetime());
		setStadium(determineStadium());
		setTime(determineTime());

	}, []);

	useEffect(() => {
		if (playerPredictions[game.gameID]?.tie) {
			setOutcome('tie');

			return;

		}

		if (playerPredictions[game.gameID]?.homeWin) {
			setOutcome('homeWin');

			return;

		}

		if (playerPredictions[game.gameID]?.awayWin) {
			setOutcome('awayWin');

			return;

		}

	}, [playerPredictions, game]);

	let updatePlayerPredictions = (e) => {
		let newOutcome = e.target.id;
		let playerPredictionsCopy = { ...playerPredictions };

		if (!playerPredictionsCopy[game.gameID]) {
			playerPredictionsCopy[game.gameID] = {
				homeWin: false,
				awayWin: false,
				tie: false
			}
		}

		if (newOutcome === 'tie') {
			playerPredictionsCopy[game.gameID].tie = true;

			playerPredictionsCopy[game.gameID].homeWin = false;
			playerPredictionsCopy[game.gameID].awayWin = false;
		}

		if (newOutcome === 'awayWin') {
			playerPredictionsCopy[game.gameID].awayWin = true;

			playerPredictionsCopy[game.gameID].homeWin = false;
			playerPredictionsCopy[game.gameID].tie = false;

		}

		if (newOutcome === 'homeWin') {
			playerPredictionsCopy[game.gameID].homeWin = true;

			playerPredictionsCopy[game.gameID].awayWin = false;
			playerPredictionsCopy[game.gameID].tie = false;

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

		<div
			className="game-card-grid"
			onClick={ () => {
				console.log('Game ID: ', game.gameID);
				console.log(outcome);

			}}
		>

			<div className="primetime-game">{ primetimeInfo }</div>

			<div className="game-card">

				<span
					id="awayWin"
					className={ `team clickable${ outcome === 'homeWin' || outcome === 'tie' ? ' losing-team' : '' }` }
					onClick={ updatePlayerPredictions }
					style={{
						'background': `${ teams[game.away.team].primaryColor }`,
						'border': `4px solid ${ teams[game.away.team].secondaryColor }`
					}}
				>

					{ game.away.team }

				</span>

				<span
					id="homeWin"
					className={ `team clickable${ outcome === 'awayWin' || outcome === 'tie' ? ' losing-team' : '' }` }
					onClick={ updatePlayerPredictions }
					style={{
						'background': `${ teams[game.home.team].primaryColor }`,
						'border': `4px solid ${ teams[game.home.team].secondaryColor }`
					}}
				>

					{ game.home.team }

				</span>

			</div>

				{

					board === 'postSeason'

					?

					<div></div>

					:

					<div className="game-tie">

						<button
							id="tie"
							className={ `${ outcome === 'tie' ? 'selected-tie-button ' : '' }tie-button auto-x-margins` }
							onClick={ updatePlayerPredictions }
						>

							TIE

						</button>

					</div>

				}

			<div className="game-time-stadium-card">

				<div className="auto-x-margins">{ time }</div>
				<div className="auto-x-margins">@{ stadium }</div>

			</div>

		</div>

	);

}

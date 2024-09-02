import React, { useState, useEffect } from 'react';

export default function Dashboard ({ setBoard, boardGames, playerPredictions, view, setView, viewWeeks, setViewWeek, teams, viewTeam, setViewTeam, saveGameSheet }) {
	const [teamLocation, setTeamLocation] = useState('Arizona');
	const [wins, setWins] = useState(0);
	const [losses, setLosses] = useState(0);

	const [saveDisabled, setSaveDisabled] = useState(true);

	useEffect(() => {
		isSaveAndSubmitDisabled();

		let gamesWon = [ ...boardGames ].reduce((acc, game) => {
			if (game.away.team === viewTeam) {
				if (teamWon(game.gameID, 'awayWin')) {
					return acc + 1;
				}
			}

			if (game.home.team === viewTeam) {
				if (teamWon(game.gameID, 'homeWin')) {
					return acc + 1;
				}
			}

			return acc;

		}, 0);

		let gamesLost = [ ...boardGames ].reduce((acc, game) => {
			if (game.away.team === viewTeam) {
				if (teamLost(game.gameID, 'awayWin')) {
					return acc + 1;
				}
			}

			if (game.home.team === viewTeam) {
				if (teamLost(game.gameID, 'homeWin')) {
					return acc + 1;
				}
			}

			return acc;

		}, 0);

		setWins(gamesWon);
		setLosses(gamesLost);

	}, [teamLocation, playerPredictions, boardGames]);

	let changeBoard = (e) => {
		setBoard(e.target.name);
	}

	let changeView = (e) => {
		setView(e.target.name);
	}

	let changeViewTeam = (e) => {
		setViewTeam(e.target.name);

		setTeamLocation(teams[e.target.name].teamLocation)

	}

	let changeViewWeek = (e) => {
		setViewWeek(Number(e.target.name))
	}

	let determineScrollBarContent = () => {
		if (view === 'team-view') {
			let teamAbbs = Object.keys(teams);

			teamAbbs.sort();

			return (

				<div className="dashboard-scrollable-content">

					{

						teamAbbs.map((team) =>

							<button
								name={ team }
								className="season-pill"
								onClick={ changeViewTeam }
							>
								{ team }

							</button>

						)

					}

				</div>

			);

		}

		if (view === 'week-view') {

			return (

				<div className="dashboard-scrollable-content">

					{

						viewWeeks.map((week) =>

							<button
								name={ week }
								className="season-pill"
								onClick={ changeViewWeek }
							>
								{ week }

							</button>

						)

					}

				</div>

			);

		}

		return null;

	}

	let teamWon = (gameID, winOutcome) => {
		if (playerPredictions[gameID] === undefined) {
			return false;
		}

		return playerPredictions[gameID][winOutcome];
	}

	let teamLost = (gameID, lossOutcome) => {
		if (playerPredictions[gameID] === undefined) {
			return false;
		}

		return !playerPredictions[gameID][lossOutcome];
	}

	let isSaveAndSubmitDisabled = () => {
		let now = new Date();
		now = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes());

		setSaveDisabled(boardGames[0]?.time < now);

	}

	return (

		<div className="foresight-dashboard">

			<div className="season-selector">

				<button
					name="preSeason"
					className="season-pill"
					onClick={ changeBoard }
				>
					Pre-Season
				</button>

				<button
					name="regularSeason"
					className="season-pill"
					onClick={ changeBoard }
				>
					Regular Season
				</button>

				<button
					name="postSeason"
					className="season-pill"
					onClick={ changeBoard }
				>
					Post-Season
				</button>

			</div>

			<div className="week-team-selector">

				<button
					name="week-view"
					className="season-pill"
					onClick={ changeView }
				>
					Weeks
				</button>

				<button
					name="team-view"
					className="season-pill"
					onClick={ changeView }
				>
					Teams
				</button>

				<button
					name="game-view"
					className="season-pill"
					onClick={ changeView }
				>
					All
				</button>

				{ determineScrollBarContent() }

			</div>

			<div className="info-and-controls">

				<div
					className="foresight-team-record"
				>
					{

						view === 'team-view' && teamLocation !== ''

						?

						`${ teamLocation }'s record is ${ wins }-${ losses }`

						:

						null

					}
				</div>

				<div></div>

				<div className="foresight-buttons">

					<button
						disabled={ saveDisabled }
						className="season-pill"
						onClick={ () => saveGameSheet(false) }
					>
						Save
					</button>

					<button
						disabled={ saveDisabled }
						className="season-pill"
						onClick={ () => saveGameSheet(true) }
					>
						Submit
					</button>

				</div>

			</div>

		</div>

	)

}

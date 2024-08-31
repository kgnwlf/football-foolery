import React, { useEffect, useState } from 'react';

export default function Game ({ game, teams, playerPredictions }) {
	const [losingTeam, setWinningTeam] = useState('');

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

	let findOtherTeam = {
		'homeWin': 'awayWin',
		'awayWin': 'homeWin'
	}

	let updateWinner = (e) => {
		if (!playerPredictions[game.gameID]) {
			playerPredictions[game.gameID] = {
				homeWin: false,
				awayWin: false,
				tie: false
			}
		}

		let toggledTeam = e.target.id;
		let toggledTeamStatus = playerPredictions[game.gameID][toggledTeam];

		let otherTeam =  findOtherTeam[toggledTeam];
		let otherTeamStatus = playerPredictions[game.gameID][otherTeam];

		if (toggledTeamStatus) {
			playerPredictions[game.gameID][toggledTeam] = false;

			return;

		}

		playerPredictions[game.gameID][toggledTeam] = true;

		setWinningTeam(toggledTeam);

		if (otherTeamStatus) {
			playerPredictions[game.gameID][otherTeam] = false;

		}

	}

	return (

		<div className="game-card">

			<span
				id="homeWin"
				className={ `team clickable${ losingTeam === 'awayWin' ? ' losing-team' : '' }` }
				onClick={ updateWinner }
				style={{
					'background': `${ teams[game.home.team].primaryColor }`,
					'border': `4px solid ${ teams[game.home.team].secondaryColor }`
				}}
			>

				{ game.home.team }

			</span>

			<span
				id="awayWin"
				className={ `team clickable${ losingTeam === 'homeWin' ? ' losing-team' : '' }` }
				onClick={ updateWinner }
				style={{
					'background': `${ teams[game.away.team].primaryColor }`,
					'border': `4px solid ${ teams[game.away.team].secondaryColor }`
				}}
			>

				{ game.away.team }

			</span>

		</div>

	)

}

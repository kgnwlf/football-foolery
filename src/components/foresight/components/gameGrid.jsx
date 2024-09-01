import React, { useState, useEffect } from 'react';

import Game from './game.jsx';

export default function GameGrid ({ teams, boardGames, playerPredictions, setPlayerPredictions, view, viewWeek, viewTeam }) {
	const [displayedGames, setDisplayedGames] = useState([]);

	useEffect(() => {
		if (!boardGames) {
			return;
		}

		if (view === 'game-view') {
			setDisplayedGames(boardGames);

			return;
		}

		if (view === 'week-view') {
			let gamesToDisplay = [ ...boardGames ].filter((game) => game.week === viewWeek);

			setDisplayedGames(gamesToDisplay);

			return;
		}

		if (view === 'team-view') {
			let gamesToDisplay = [ ...boardGames ].filter((game) => game.home.team === viewTeam || game.away.team === viewTeam);

			setDisplayedGames(gamesToDisplay);

			return;
		}

	}, [boardGames, view, viewWeek, viewTeam]);

	return (

		<div className="game-grid-container">

			{

				displayedGames.map((game) =>

					<Game
						key={ `${ game.away.team }${ game.time }${ game.home.team }` }
						game={ game }
						teams={ teams }
						playerPredictions={ playerPredictions }
						setPlayerPredictions={ setPlayerPredictions }
					/>

				)

			}

		</div>

	);

}

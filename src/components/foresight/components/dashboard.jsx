import React from 'react';

export default function Dashboard ({ setBoard, view, setView, viewWeeks, setViewWeek, teams, setViewTeam }) {
	let changeBoard = (e) => {
		setBoard(e.target.name);
	}

	let changeView = (e) => {
		setView(e.target.name);
	}

	let changeViewTeam = (e) => {
		setViewTeam(e.target.name);
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



			</div>

		</div>

	)

}

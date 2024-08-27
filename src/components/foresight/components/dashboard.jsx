import React from 'react';

export default function Dashboard () {

	return (

		<div className="foresight-dashboard">

			<div className="season-selector">

				<button
					name="preSeason"
					className="season-pill"
					onClick={ (e) => console.log(e.target.name) }
				>
					Pre-Season
				</button>

				<button
					name="regularSeason"
					className="season-pill"
					onClick={ (e) => console.log(e.target.name) }
				>
					Regular Season
				</button>

				<button
					name="postSeason"
					className="season-pill"
					onClick={ (e) => console.log(e.target.name) }
				>
					Post-Season
				</button>

			</div>

			<div className="week-team-selector">

				<button
					name="week-view"
					className="season-pill"
					onClick={ (e) => console.log(e.target.name) }
				>
					Weeks
				</button>

				<button
					name="team-view"
					className="season-pill"
					onClick={ (e) => console.log(e.target.name) }
				>
					Teams
				</button>

				<button
					name="game-view"
					className="season-pill"
					onClick={ (e) => console.log(e.target.name) }
				>
					All
				</button>

				<button
					name="expand-view"
					className="season-pill"
					onClick={ (e) => console.log(e.target.name) }
				>
					Expand
				</button>

			</div>

		</div>

	)

}

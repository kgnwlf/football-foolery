import React, { useState, useEffect } from 'react';

import { seedConferences } from './seedingFunctions.js';

export default function PlayoffSeeding ({ boardGames, teams, playerPredictions }) {
	const [nfcFirst, setNFCFirst] = useState([]);
	const [nfcSecond, setNFCSecond] = useState([]);
	const [nfcThird, setNFCThird] = useState([]);
	const [nfcFourth, setNFCFourth] = useState([]);
	const [nfcFifth, setNFCFifth] = useState([]);
	const [nfcSixth, setNFCSixth] = useState([]);
	const [nfcSeventh, setNFCSeventh] = useState([]);

	const [afcFirst, setAFCFirst] = useState([]);
	const [afcSecond, setAFCSecond] = useState([]);
	const [afcThird, setAFCThird] = useState([]);
	const [afcFourth, setAFCFourth] = useState([]);
	const [afcFifth, setAFCFifth] = useState([]);
	const [afcSixth, setAFCSixth] = useState([]);
	const [afcSeventh, setAFCSeventh] = useState([]);

	useEffect(() => {
		if (boardGames === undefined || boardGames.length === 0) {
			if (nfcFirst[0] !== undefined) {
				setNFCFirst([]);
				setAFCFirst([]);
			}

			return;
		}

		let [ nfc, afc ] = seedConferences(boardGames, teams, playerPredictions);

		setNFCFirst(nfc[0]);
		setNFCSecond(nfc[1]);
		setNFCThird(nfc[2]);
		setNFCFourth(nfc[3]);
		setNFCFifth(nfc[4]);
		setNFCSixth(nfc[5]);
		setNFCSeventh(nfc[6]);

		setAFCFirst(afc[0]);
		setAFCSecond(afc[1]);
		setAFCThird(afc[2]);
		setAFCFourth(afc[3]);
		setAFCFifth(afc[4]);
		setAFCSixth(afc[5]);
		setAFCSeventh(afc[6]);

	}, [boardGames, playerPredictions]);

	return (

		<div className="foresight-playoff-seeding">

			{

				nfcFirst[0] !== undefined

				?

				<div className="conference-container">

					<div className="nfc">NFC</div>

					<div
						className="first"
						style={{
							'backgroundColor': `${ teams[nfcFirst[0]]?.primaryColor }`,
							'border': `4px solid ${ teams[nfcFirst[0]]?.secondaryColor }`
						}}
					>

						{ nfcFirst[0] }

						<span className="playoff-seeding-record">

							{ `(${ nfcFirst[1]?.wins }-${ nfcFirst[1]?.losses }${ nfcFirst[1].ties > 0 ? `-${ nfcFirst[1].ties }` : '' })` }

						</span>

					</div>


					<div className="conference-grid">

						<div
							className="second seeding-sizing"
							style={{
								'backgroundColor': `${ teams[nfcSecond[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[nfcSecond[0]]?.secondaryColor }`
							}}
						>

							{ nfcSecond[0] }

							<span className="playoff-seeding-record">

								{ `(${ nfcSecond[1]?.wins }-${ nfcSecond[1]?.losses }${ nfcSecond[1].ties > 0 ? `-${ nfcSecond[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="third seeding-sizing"
							style={{
								'backgroundColor': `${ teams[nfcThird[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[nfcThird[0]]?.secondaryColor }`
							}}
						>

							{ nfcThird[0] }

							<span className="playoff-seeding-record">

								{ `(${ nfcThird[1]?.wins }-${ nfcThird[1]?.losses }${ nfcThird[1].ties > 0 ? `-${ nfcThird[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="fourth seeding-sizing"
							style={{
								'backgroundColor': `${ teams[nfcFourth[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[nfcFourth[0]]?.secondaryColor }`
							}}
						>

							{ nfcFourth[0] }

							<span className="playoff-seeding-record">

								{ `(${ nfcFourth[1]?.wins }-${ nfcFourth[1]?.losses }${ nfcFourth[1].ties > 0 ? `-${ nfcFourth[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="fifth seeding-sizing"
							style={{
								'backgroundColor': `${ teams[nfcFifth[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[nfcFifth[0]]?.secondaryColor }`
							}}
						>

							{ nfcFifth[0] }

							<span className="playoff-seeding-record">

								{ `(${ nfcFifth[1]?.wins }-${ nfcFifth[1]?.losses }${ nfcFifth[1].ties > 0 ? `-${ nfcFifth[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="sixth seeding-sizing"
							style={{
								'backgroundColor': `${ teams[nfcSixth[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[nfcSixth[0]]?.secondaryColor }`
							}}
						>

							{ nfcSixth[0] }

							<span className="playoff-seeding-record">

								{ `(${ nfcSixth[1]?.wins }-${ nfcSixth[1]?.losses }${ nfcSixth[1].ties > 0 ? `-${ nfcSixth[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="seventh seeding-sizing"
							style={{
								'backgroundColor': `${ teams[nfcSeventh[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[nfcSeventh[0]]?.secondaryColor }`
							}}
						>

							{ nfcSeventh[0] }

							<span className="playoff-seeding-record">

								{ `(${ nfcSeventh[1]?.wins }-${ nfcSeventh[1]?.losses }${ nfcSeventh[1].ties > 0 ? `-${ nfcSeventh[1].ties }` : '' })` }

							</span>

						</div>

					</div>

				</div>

				:

				null

			}

			{

				afcFirst[0] !== undefined

				?

				<div className="conference-container">

					<div className="afc">AFC</div>

					<div
						className="first"
						style={{
							'backgroundColor': `${ teams[afcFirst[0]]?.primaryColor }`,
							'border': `4px solid ${ teams[afcFirst[0]]?.secondaryColor }`
						}}
					>

						{ afcFirst[0] }

						<span className="playoff-seeding-record">

							{ `(${ afcFirst[1]?.wins }-${ afcFirst[1]?.losses }${ afcFirst[1].ties > 0 ? `-${ afcFirst[1].ties }` : '' })` }

						</span>

					</div>


					<div className="conference-grid">

						<div
							className="second seeding-sizing"
							style={{
								'backgroundColor': `${ teams[afcSecond[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[afcSecond[0]]?.secondaryColor }`
							}}
						>

							{ afcSecond[0] }

							<span className="playoff-seeding-record">

								{ `(${ afcSecond[1]?.wins }-${ afcSecond[1]?.losses }${ afcSecond[1].ties > 0 ? `-${ afcSecond[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="third seeding-sizing"
							style={{
								'backgroundColor': `${ teams[afcThird[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[afcThird[0]]?.secondaryColor }`
							}}
						>

							{ afcThird[0] }

							<span className="playoff-seeding-record">

								{ `(${ afcThird[1]?.wins }-${ afcThird[1]?.losses }${ afcThird[1].ties > 0 ? `-${ afcThird[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="fourth seeding-sizing"
							style={{
								'backgroundColor': `${ teams[afcFourth[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[afcFourth[0]]?.secondaryColor }`
							}}
						>

							{ afcFourth[0] }

							<span className="playoff-seeding-record">

								{ `(${ afcFourth[1]?.wins }-${ afcFourth[1]?.losses }${ afcFourth[1].ties > 0 ? `-${ afcFourth[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="fifth seeding-sizing"
							style={{
								'backgroundColor': `${ teams[afcFifth[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[afcFifth[0]]?.secondaryColor }`
							}}
						>

							{ afcFifth[0] }

							<span className="playoff-seeding-record">

								{ `(${ afcFifth[1]?.wins }-${ afcFifth[1]?.losses }${ afcFifth[1].ties > 0 ? `-${ afcFifth[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="sixth seeding-sizing"
							style={{
								'backgroundColor': `${ teams[afcSixth[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[afcSixth[0]]?.secondaryColor }`
							}}
						>

							{ afcSixth[0] }

							<span className="playoff-seeding-record">

								{ `(${ afcSixth[1]?.wins }-${ afcSixth[1]?.losses }${ afcSixth[1].ties > 0 ? `-${ afcSixth[1].ties }` : '' })` }

							</span>

						</div>

						<div
							className="seventh seeding-sizing"
							style={{
								'backgroundColor': `${ teams[afcSeventh[0]]?.primaryColor }`,
								'border': `4px solid ${ teams[afcSeventh[0]]?.secondaryColor }`
							}}
						>

							{ afcSeventh[0] }

							<span className="playoff-seeding-record">

								{ `(${ afcSeventh[1]?.wins }-${ afcSeventh[1]?.losses }${ afcSeventh[1].ties > 0 ? `-${ afcSeventh[1].ties }` : '' })` }

							</span>

						</div>

					</div>

				</div>

				:

				null

			}

		</div>

	);

}

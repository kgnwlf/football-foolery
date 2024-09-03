let sortTeams = (teamA, teamB) => {
	let aResults = teamA[1];
	let bResults = teamB[1];

	if (aResults.wins > bResults.wins) {
		return -1;
	}

	if (aResults.wins < bResults.wins) {
		return 1;
	}

	if (aResults.wins === bResults.wins) {
		if (aResults.divisionWins > bResults.divisionWins) {
			return -1;
		}

		if (aResults.divisionWins < bResults.divisionWins) {
			return 1;
		}

		if (aResults.conferenceWins > bResults.conferenceWins) {
			return -1;
		}

		if (aResults.conferenceWins < bResults.conferenceWins) {
			return 1;
		}

		return 0;

	}

	return 0;

};

export const seedConferences = (games, teams, playerPredictions) => {
	let resultsOfPredictions = {

	};

	games.forEach((game) => {
		let awayTeamDetails = teams[game.away.team];
		let homeTeamDetails = teams[game.home.team];

		let gamePrediction = playerPredictions[game.gameID];

		let homeWin = gamePrediction?.homeWin;
		let awayWin = gamePrediction?.awayWin;
		let tie = gamePrediction?.tie;

		let divisionGame = awayTeamDetails.division === homeTeamDetails.division;
		let conferenceGame = awayTeamDetails.division[0] === homeTeamDetails.division[0];

		if (!resultsOfPredictions[game.home.team]) {
			resultsOfPredictions[game.home.team] = {
				division: homeTeamDetails.division[1],
				conference: homeTeamDetails.division[0],
				wins: 0,
				losses: 0,
				ties: 0,
				divisionWins: 0,
				conferenceWins: 0
			}

		}

		if (!resultsOfPredictions[game.away.team]) {
			resultsOfPredictions[game.away.team] = {
				division: awayTeamDetails.division[1],
				conference: awayTeamDetails.division[0],
				wins: 0,
				losses: 0,
				ties: 0,
				divisionWins: 0,
				conferenceWins: 0
			}

		}

		if (homeWin) {
			resultsOfPredictions[game.home.team].wins += 1;
			resultsOfPredictions[game.away.team].losses += 1;

			if (divisionGame) {
				resultsOfPredictions[game.home.team].divisionWins += 1;
			}

			if (conferenceGame) {
				resultsOfPredictions[game.home.team].conferenceWins += 1;
			}

		}

		if (awayWin) {
			resultsOfPredictions[game.home.team].losses += 1;
			resultsOfPredictions[game.away.team].wins += 1;

			if (divisionGame) {
				resultsOfPredictions[game.away.team].divisionWins += 1;
			}

			if (conferenceGame) {
				resultsOfPredictions[game.away.team].conferenceWins += 1;
			}

		}

		if (tie) {
			resultsOfPredictions[game.home.team].ties += 1;
			resultsOfPredictions[game.away.team].ties += 1;
		}

	});

	resultsOfPredictions = Object.entries(resultsOfPredictions);

	resultsOfPredictions.sort(sortTeams);

	let afc = [];
	let afcDivisionLeaders = {};

	let nfc = [];
	let nfcDivisionLeaders = {};

	resultsOfPredictions.forEach((team) => {
		let division = team[1].division;

		if (team[1].conference === 'N') {

			if (!nfcDivisionLeaders[division]) {
				nfcDivisionLeaders[division] = team;

				return;

			}

			if (nfcDivisionLeaders[division][1].wins < team[1].wins) {
				nfcDivisionLeaders[division] = team;

				return;

			}

			if (nfcDivisionLeaders[division][1].wins === team[1].wins) {
				if (nfcDivisionLeaders[division][1].divisionWins > team[1].divisionWins) {
					nfc.push(team);

					return;
				}

				if (nfcDivisionLeaders[division][1].divisionWins < team[1].divisionWins) {
					nfcDivisionLeaders[division] = team;

					return;

				}

				if (nfcDivisionLeaders[division][1].conferenceWins > team[1].conferenceWins) {
					nfc.push(team);

					return;
				}

				if (nfcDivisionLeaders[division][1].conferenceWins < team[1].conferenceWins) {
					nfcDivisionLeaders[division] = team;

					return;

				}
			}

			nfc.push(team);

		}

		if (team[1].conference === 'A'){
			if (!afcDivisionLeaders[division]) {
				afcDivisionLeaders[division] = team;

				return;

			}

			if (afcDivisionLeaders[division][1].wins < team[1].wins) {
				afcDivisionLeaders[division] = team;

				return;

			}

			if (afcDivisionLeaders[division][1].wins === team[1].wins) {
				if (afcDivisionLeaders[division][1].divisionWins > team[1].divisionWins) {
					afc.push(team);

					return;
				}

				if (afcDivisionLeaders[division][1].divisionWins < team[1].divisionWins) {
					afcDivisionLeaders[division] = team;

					return;

				}

				if (afcDivisionLeaders[division][1].conferenceWins > team[1].conferenceWins) {
					afc.push(team);

					return;
				}

				if (afcDivisionLeaders[division][1].conferenceWins < team[1].conferenceWins) {
					afcDivisionLeaders[division] = team;

					return;

				}

			}

			afc.push(team);

		}

	});

	nfcDivisionLeaders = Object.values(nfcDivisionLeaders);
	afcDivisionLeaders = Object.values(afcDivisionLeaders);

	nfcDivisionLeaders.sort(sortTeams);
	afcDivisionLeaders.sort(sortTeams);

	nfc = [ ...nfcDivisionLeaders, ...nfc ];
	afc = [ ...afcDivisionLeaders, ...afc ];

	return [ nfc, afc ];

}

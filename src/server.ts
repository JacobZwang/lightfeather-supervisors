import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { Supervisor } from './types';

const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/status', (req, res) => {
	res.status(200);
	res.end();
});

app.get('/api/supervisors', async (req, res) => {
	const supervisors = await fetch(
		'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers'
	).then((res) => res.json() as Promise<Supervisor[]>);

	res.json(
		supervisors
			.map((s) => `${s.jurisdiction}-${s.lastName}-${s.firstName}`) // The format of the supervisors returned must be displayed in the following format:“<jurisdiction> - <lastName>, <firstName>”
			.sort() // The supervisors must be sorted in alphabetical order, first by jurisdiction, then by last name, finally by first name.
			.filter((s) => !s.match(/[0-9]/)) // Numeric jurisdictions should be removed from the response.
	);

	res.end();
});

app.get('/api/submit', () => {});

app.listen(8080, () => {
	console.log('listending on 8080');
});

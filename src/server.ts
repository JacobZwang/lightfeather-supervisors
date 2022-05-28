import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { Supervisor } from './types';
import cors from 'cors';
import { Client } from 'pg';
// @ts-ignore
import updateNotifQuery from './sql/notif-update.sql';
// @ts-ignore
import deleteNotifQuery from './sql/notif-delete.sql';

const client = new Client();
client.connect().then(() => {
	const app = express();
	app.use(express.json());
	app.use(
		cors({
			origin: '*'
		})
	);

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
				.map((s) => ({
					str: `${s.jurisdiction}-${s.lastName}-${s.firstName}`
				})) // The format of the supervisors returned must be displayed in the following format:“<jurisdiction> - <lastName>, <firstName>”
				.sort() // The supervisors must be sorted in alphabetical order, first by jurisdiction, then by last name, finally by first name.
				.filter((s) => !s.str.match(/[0-9]/)) // Numeric jurisdictions should be removed from the response.
		);

		res.end();
	});

	app.post('/api/submit', (req, res) => {
		if (!req.body.firstName) res.status(401).write('First name is required\n');
		if (!req.body.lastName) res.status(401).write('Last name is required\n');
		if (!req.body.supervisor) res.status(406).write('Supervisor is required\n');

		if (res.statusCode === 200) {
			console.log(req.body);

			if (!req.body.email && !req.body.phone) {
				client.query(deleteNotifQuery, [
					req.body.firstName,
					req.body.lastName,
					req.body.supervisor
				]);
			} else {
				client
					.query(updateNotifQuery, [
						req.body.phone,
						req.body.email,
						req.body.firstName,
						req.body.lastName,
						req.body.supervisor
					])
					.then((res) => {
						console.log(res);
					})
					.catch((err) => {
						console.error(err);
					});
			}
		}

		res.end();
	});

	app.listen(8080, () => {
		console.log('listending on 8080');
	});
});

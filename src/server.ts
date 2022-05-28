import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));
// console.log(new URL('../build', import.meta.url).pathname);

app.get('/status', (req, res) => {
	res.status(200);
	res.end();
});

app.listen(8080, () => {
	console.log('listending on 8080');
});

// based on https://github.com/JacobZwang/ntt

import esbuild from 'esbuild';
import minimist from 'minimist';
import chalk from 'chalk';
import { spawn } from 'child_process';

const args = minimist(process.argv.slice(2));

let server;

esbuild
	.build({
		entryPoints: ['./src/server.ts'],
		outfile: './build-server/server.cjs',
		bundle: true,
		platform: 'node',
		format: 'cjs',
		external: ['pg-native'],
		loader: {
			'.sql': 'text'
		},
		watch: args['watchbuild']
			? {
					onRebuild(error, result) {
						if (error) console.error(chalk.red('error   :', error));
						else console.log(chalk.green('success :'), 'built and bundled server.ts');

						if (args['watchstart']) {
							runProcess();
						}
					}
			  }
			: undefined
	})
	.then(() => {
		console.log(chalk.green('success :'), 'built and bundled server.ts');
		if (args['watchstart']) {
			runProcess();
		}
	});

function runProcess() {
	if (server) server.kill();

	server = spawn('node', ['./build-server/server.cjs']);
	console.log(chalk.blue('started...'));

	server.stdout.on('data', (data) => {
		console.log(data.toString());
	});

	server.stdout.on('close', () => {
		console.log('ended');
	});
}

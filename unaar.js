const os = require('os');
const fs = require('node:fs');
const fsPromise = require('node:fs/promises');

const exec = function execShellCommand(cmd) {
	const exec = require('child_process').exec;

	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
			}
			resolve(stdout ? stdout : stderr);
		});
	});
}

async function fn() {
	const stdout = await exec('mvn dependency:list --settings E:\\maven\\settings-mio.xml');

	const regex = /([\w.]+):([\w-]+):(\w+).*:([\w.]+):([\w.]+)/;

	if (fs.existsSync('./lib')) {
		await fsPromise.rm('./lib', { recursive: true });
	}
	
	await fsPromise.mkdir('./lib', {});

	const vv = stdout.split("\n")
		.map(row => row.replace('\r', ''))
		.filter(row => regex.test(row))
		.map(row => regex.exec(row))
		.filter(values => values[3] == 'aar');

	for await (const values of vv) {

		const fileAAR = 'E:\\maven\\repository\\' + values[1].replaceAll('.', '\\') + '\\' + values[2] + '\\' + values[4] + '\\' + values[2] + '-' + values[4] + '.aar';
		const tempFolder = os.tmpdir() + '\\extract';
		const fileName = values[2] + '-' + values[4] + '.zip';

		if (fs.existsSync(tempFolder)) {
			await fsPromise.rm(tempFolder, { recursive: true });
		}

		await fsPromise.mkdir(tempFolder, {});
		await fsPromise.copyFile(fileAAR, tempFolder + '\\' + fileName);

		await exec(`7z x ${tempFolder + '\\' + fileName} -o${tempFolder}`);

		await fsPromise.copyFile(tempFolder + '\\classes.jar', 'lib\\' + values[2] + '-' + values[4] + '.jar');

		console.log('Copy ' + values[2] + '-' + values[4]);
	}
}

fn();
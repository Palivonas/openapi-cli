const fs = require('fs');
const path = require('path');
const clear = require('clear');
const action = require('./action');
const resource = require('./resource');
const crud = require('./crud');
const definition = require('./definition');
const custom = require('./custom');

const load = docPath => {
	if (fs.existsSync(docPath)) {
		console.log('\n\nloading', docPath);
		return JSON.parse(fs.readFileSync(docPath));
	}
	console.log('\n\ncreating', docPath);
	return {
		paths: {},
		definitions: {}
	};
};

const save = (def, docFolder, docPath) => {
	console.log('\n\nsaving', docPath);
	if (!fs.existsSync(docFolder)) fs.mkdirSync(docFolder);
	fs.writeFileSync(docPath, JSON.stringify(def, null, 2));
};

const runCycle = async (def, _resourceName) => {
	try {


		let resourceName = _resourceName;

		// 1. what action do you want to perform
		const actionAnswers = await action();
		if (actionAnswers.action === 'exit') return;

		if (actionAnswers.action === 'view') console.log(JSON.stringify(def, null, 2));

		// 3. perform the action
		if (actionAnswers.action === 'crud') {

			clear();
			const resourceAnswers = await resource(actionAnswers, resourceName);
			await crud(def, resourceAnswers);
			resourceName = resourceAnswers.resourceName;

		} else if (actionAnswers.action === 'definition') {

			clear();
			const resourceAnswers = await resource(actionAnswers, resourceName);
			await definition(def, resourceAnswers);
			resourceName = resourceAnswers.resourceName;

		} else if (actionAnswers.action === 'custom') {

			clear();
			const resourceAnswers = await resource(actionAnswers, resourceName);
			await custom(def, resourceAnswers);
			resourceName = resourceAnswers.resourceName;

		} else if (actionAnswers.action === 'save') {

			clear();
			const docFolder = path.join(__dirname, resourceName);
			const docPath = path.join(docFolder, `${resourceName}.def.json`);
			save(def, docFolder, docPath);
		}

		await runCycle(def, resourceName);
		clear();

	} catch (err) {
		console.error(err);
	}
};

const main = async resourceName => {
	clear();
	const docFolder = path.join(__dirname, resourceName);
	const docPath = path.join(docFolder, `${resourceName}.def.json`);
	const def = load(docPath);
	await runCycle(def, resourceName);
};

main(process.argv[2]);

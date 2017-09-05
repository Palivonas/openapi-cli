const _ = require('lodash');
const inquirer = require('inquirer');

module.exports = async (def, names) => {

	const crudQuestions = [
		{
			type: 'checkbox',
			name: 'crud',
			message: 'Which CRUD Routes',
			choices: [
				{
					key: 'get',
					name: 'get',
					value: 'get'
				},
				{
					key: 'list',
					name: 'list',
					value: 'list'
				},
				{
					key: 'create',
					name: 'create',
					value: 'create'
				},
				{
					key: 'patch',
					name: 'patch',
					value: 'patch'
				},
				{
					key: 'delete',
					name: 'delete',
					value: 'delete'
				}
			]
		}
	];

	const addPath = path => {
		if (!def.paths[path]) def.paths[path] = {};
	};

	const addMethod = (method, path) => {
		addPath(path);
		if (!def.paths[path][method]) def.paths[path][method] = {};
		return def.paths[path][method];
	};

	const addGet = () => {
		const method = addMethod('get', '/{id}');
		method.summary = `Fetch a ${names.Singular} by ID`;
		method.description = `Fetch a ${names.singular} by ID.`;
		method.operationId = 'getById';
		method.parameters = [];
		method.responses = {
			200: {
				description: `A ${names.Singular}`,
				schema: {
					$ref: `#/definitions/${names.Singular}`
				}
			}
		};
	};

	const addList = () => {
		const method = addMethod('get', '/');
		method.summary = `List ${names.Plural}`;
		method.description = `List all available ${names.plural}.`;
		method.operationId = 'list';
		method.parameters = [];
		method.responses = {
			200: {
				description: `List of ${names.Plural}`,
				schema: {
					$ref: `#/definitions/${names.Singular} List`
				}
			}
		};
	};

	const addCreate = () => {
		const method = addMethod('post', '/');
		method.summary = `Create ${names.Singular}`;
		method.description = `Create a new ${names.Singular}.`;
		method.operationId = 'create';
		method.parameters = [];
		method.responses = {
			200: {
				description: `Created ${names.Singular}`,
				schema: {
					$ref: `#/definitions/${names.Singular}`
				}
			}
		};
	};

	const addPatch = () => {
		const method = addMethod('patch', '/{id}');
		method.summary = `Update ${names.Singular}`;
		method.description = `Update an existing ${names.Singular}.`;
		method.operationId = 'update';
		method.parameters = [];
		method.responses = {
			200: {
				description: `Created ${names.Singular}`,
				schema: {
					$ref: `#/definitions/${names.Singular}`
				}
			}
		};
	};

	const addDelete = () => {
		const method = addMethod('delete', '/{id}');
		method.summary = `Delete a ${names.Singular} by ID`;
		method.description = `Delete an existing ${names.Singular}.`;
		method.operationId = 'delete';
		method.parameters = [];
		// method.responses = {
		// 	200: {
		// 		description: ` ${names.Singular}`,
		// 	}
		// };
	};

	const makeCrud = crudAnswers => {
		_.each(crudAnswers.crud, crudType => {
			// console.log(crudType);
			if (crudType === 'get') addGet(def, names);
			if (crudType === 'list') addList(def, names);
			if (crudType === 'create') addCreate(def, names);
			if (crudType === 'patch') addPatch(def, names);
			if (crudType === 'delete') addDelete(def, names);
		});
	};

	const crudAnswers = await inquirer.prompt(crudQuestions);
	makeCrud(crudAnswers);
};

const inquirer = require('inquirer');

const customQuestions = [
	{
		type: 'list',
		name: 'method',
		message: 'Route Method',
		choices: [
			{
				key: 'get',
				name: 'GET',
				value: 'get'
			},
			{
				key: 'post',
				name: 'POST',
				value: 'post'
			},
			{
				key: 'put',
				name: 'PUT',
				value: 'put'
			},
			{
				key: 'delete',
				name: 'DELETE',
				value: 'delete'
			}
		]
	},
	{
		type: 'input',
		name: 'path',
		message: 'Please enter the path'
	},
	{
		type: 'input',
		name: 'operationId',
		message: 'Operation Method Name'
	},
	{
		type: 'input',
		name: 'summary',
		message: 'Summary'
	},
	{
		type: 'input',
		name: 'description',
		message: 'Description',
		default(answers) {
			return answers.summary;
		}
	}
];

const paramQuestions = [
	{
		type: 'input',
		name: 'name',
		message: 'Parameter Name'
	},
	{
		type: 'confirm',
		name: 'required',
		message: 'Parameter Required?'
	},
	{
		type: 'input',
		name: 'description',
		message: 'Parameter Description',
		default(answers) {
			return answers.name
		}
	},
	{
		type: 'list',
		name: 'in',
		message: 'in',
		choices: [
			{
				name: 'path',
				message: 'path'
			},
			{
				name: 'body',
				message: 'path'
			},
			{
				name: 'query',
				message: 'path'
			}
		]
	},

];


const paramActionQuestions = [
	{
		type: 'list',
		name: 'routeAction',
		message: 'Route Options',
		choices: [
			{
				name: 'stop',
				value: 'stop',
				message: 'No more parameters'
			},
			{
				name: 'addParameter',
				value: 'addParameter',
				message: 'Add Parameter'
			}
		]
	}
];


// paths: {
// 	'/': {
// 		post: {
// 			summary: 'Create {Singular}',
// 			description: 'This endpoint allows the user to create a {singular}.',
// 			operationId: 'create',
// 			responses: {
// 				200: {
// 					description: 'List of {Plural}',
// 					schema: {
// 						$ref: '#/definitions/{Singular} List'
// 					}
// 				}
// 			}
// 		},


module.exports = async (def, state) => {

	const addPath = path => {
		if (!def.paths[path]) def.paths[path] = {};
	};

	const addMethod = (method, path) => {
		addPath(path);
		if (!def.paths[path][method]) def.paths[path][method] = {};
		return def.paths[path][method];
	};

	// 	method.responses = {
	// 		200: {
	// 			description: `A ${names.Singular}`,
	// 			schema: {
	// 				$ref: `#/definitions/${names.Singular}`
	// 			}
	// 		}
	// 	};

	const addCustomRoute = async () => {
		const route = await inquirer.prompt(customQuestions);
		const method = addMethod(route.method, route.path);
		method.operationId = route.operationId;
		method.summary = route.summary;
		method.description = route.description;
		method.parameters = [];
		method.responses = {};
		await addParameter(method);
	};

	const addParameter = async method => {
		const paramAction = await inquirer.prompt(paramActionQuestions);
		console.log(paramAction);

		if (paramAction.routeAction === 'addParameter') {
			const param = await inquirer.prompt(paramQuestions);
			method.parameters.push(param);
		}
	};

	// const addParameter = async method => {
	// 	const paramAction = await inquirer.prompt(paramActionQuestions);
	// 	console.log(paramAction);

	// 	if (paramAction.routeAction === 'addParameter') {
	// 		const param = await inquirer.prompt(paramQuestions);
	// 		method.parameters.push(param);
	// 	}
	// };

	await addCustomRoute();

};

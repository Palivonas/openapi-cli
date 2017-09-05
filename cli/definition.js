const inquirer = require('inquirer');

const questions = [
	{
		type: 'input',
		name: 'key',
		message: 'Property Name'
	},
	{
		type: 'list',
		name: 'type',
		message: 'Property Type',
		choices: [
			{
				key: 'exit',
				name: 'exit',
				value: 'exit'
			},
			{
				key: 'string',
				name: 'string',
				value: 'string'
			},
			{
				key: 'number',
				name: 'number',
				value: 'number'
			},
			{
				key: 'boolean',
				name: 'boolean',
				value: 'boolean'
			},
			{
				key: 'object',
				name: 'object',
				value: 'object'
			},
			{
				key: 'array',
				name: 'array',
				value: 'array'
			}
		]
	}
];

const modelDefinitionQuestions = [
	{
		type: 'input',
		name: 'modelDefinitionName',
		message: 'Definition Name'
	}
];

const resourceListQuestions = [
	{
		type: 'confirm',
		name: 'listRequired',
		message: 'Would you like to add a List Resource?'
	}
];

module.exports = async (def, state) => {

	modelDefinitionQuestions[0].default = state.Singular;
	const resource = await inquirer.prompt(modelDefinitionQuestions);

	def.definitions[resource.modelDefinitionName] = {
		properties: {}
	};

	const model = def.definitions[resource.modelDefinitionName];

	const addProperties = async () => {
		const addProperty = async () => {
			const propertyAnswer = await inquirer.prompt(questions);

			if (propertyAnswer.type === 'exit') return;

			const key = propertyAnswer.key;
			if (!model.properties[key]) model.properties[key] = {};
			model.properties[key].type = propertyAnswer.type;

			return addProperty();
		};

		return addProperty();
	};

	await addProperties();

	const listResource = await inquirer.prompt(resourceListQuestions);

	if (listResource.listRequired) {
		const listName = `${resource.modelDefinitionName} List`;
		def.definitions[listName] = {
			properties: {
				count: {
					type: 'number'
				},
				items: {
					type: 'object',
					$ref: `#/definitions/${state.Singular}`
				}
			}
		};
	}

};

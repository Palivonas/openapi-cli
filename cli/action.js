const inquirer = require('inquirer');

const actionQuestions = [
	{
		type: 'list',
		name: 'action',
		message: 'What would you like to do?',
		choices: [
			{
				key: 'addCRUD',
				name: 'add a CRUD Route',
				value: 'crud'
			},
			// {
			// 	key: 'addCustom',
			// 	name: 'add a Custom Route',
			// 	value: 'custom'
			// },
			{
				key: 'addModel',
				name: 'add a Model Definitions',
				value: 'definition'
			},
			{
				key: 'view',
				name: 'View OpenAPI Specification',
				value: 'view'
			},
			{
				key: 'save',
				name: 'Save Specification',
				value: 'save'
			},
			{
				key: 'exit',
				name: 'Exit',
				value: 'exit'
			}
		]
	}
];

module.exports = () => {
	return inquirer.prompt(actionQuestions);
};

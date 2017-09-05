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
		name: 'operation',
		message: 'Operation Method Name'
	}
];


module.exports = async (def, state) => {

	const customRoute = await inquirer.prompt(customQuestions);

};

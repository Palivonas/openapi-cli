const _ = require('lodash');
const inquirer = require('inquirer');
const pluralize = require('pluralize');

const questions = [
	{
		type: 'input',
		name: 'resourceName',
		message: 'Please enter the resource name'
	},
	{
		type: 'input',
		name: 'pluralName',
		message: 'Please enter the plural name',
		default(answers) {
			return pluralize(answers.resourceName.toLowerCase());
		}
	}
];

module.exports = async (state, singular = '') => {
	questions[0].default = singular;
	const answers = await inquirer.prompt(questions);
	const resourceName = answers.resourceName;
	const names = {
		singular: resourceName,
		Singular: _.capitalize(resourceName),
		plural: pluralize(resourceName),
		Plural: _.capitalize(pluralize(resourceName))
	};

	return Object.assign({}, state, answers, names);
};

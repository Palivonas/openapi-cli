module.exports = {
	definitions: {
		'Singular': {
			properties: {
				id: {
					type: 'string',
					id: true,
					required: true
				}
			}
		},
		'Singular List': {
			properties: {
				count: {
					type: 'number'
				},
				items: {
					type: 'object',
					$ref: '#/definitions/Singular'
				}
			}
		}
	},
	paths: {
		'/': {
			post: {
				summary: 'Create {Singular}',
				description: 'This endpoint allows the user to create a {singular}.',
				operationId: 'create',
				responses: {
					200: {
						description: 'List of {Plural}',
						schema: {
							$ref: '#/definitions/{Singular} List'
						}
					}
				}
			},
			get: {
				summary: 'List {Plural}',
				description: 'This endpoint allows the user to list all {plural}.',
				operationId: 'list',
				parameters: [
					{
						name: 'filter',
						in: 'query',
						description: 'The criteria used to narrow down the number of {plural} returned.',
						required: false,
						type: 'string',
						format: 'JSON'
					}
				],
				responses: {
					200: {
						description: 'List of {Plural}',
						schema: {
							$ref: '#/definitions/{Singular} List'
						}
					}
				}
			}
		}
	}
};

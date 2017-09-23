'use strict';
const camelcaseKeys = require('camelcase-keys');
const decamelizeKeys = require('decamelize-keys');
const minimist = require('minimist');

const parse = (args, opts) => {
	const argv = minimist(args, opts);
	const input = argv._;

	delete argv._;

	return {input, argv};
};

module.exports = (args, opts) => {
	opts = Object.assign({
		inferType: false,
		default: {},
		string: ['_'],
		boolean: [],
		any: []
	}, opts);

	opts.default = decamelizeKeys(opts.default, '-');

	const index = opts.string.indexOf('_');

	if (opts.inferType === false && index === -1) {
		opts.string.push('_');
	} else if (opts.inferType === true && index !== -1) {
		opts.string.splice(index, 1);
	}

	if (opts.any.length > 0) {
		opts.boolean = opts.boolean.concat(opts.any);
		opts.string = opts.string.concat(opts.any);
	}

	const parsed = parse(args, opts);

	if (opts.any.length > 0) {
		const reparsed = parse(args, Object.assign(opts, {
			boolean: opts.boolean.filter(x => opts.any.indexOf(x) !== -1 && parsed.argv[x] === ''),
			string: opts.string.filter(x => opts.any.indexOf(x) !== -1 && parsed.argv[x] === true)
		}));

		parsed.argv = Object.assign(parsed.argv, reparsed.argv);
	}

	const input = parsed.input;
	const flags = camelcaseKeys(parsed.argv, {exclude: ['--', /^\w$/]});

	return {
		flags,
		input
	};
};

import test from 'ava';
import m from '.';

test('parse argv', t => {
	const parsed = m(['foo', '--foo-bar', '-u', 'cat', '--', 'unicorn', 'cake'], {
		alias: {u: 'unicorn'},
		default: {meow: 'dog'},
		'--': true
	});

	t.deepEqual(parsed, {
		input: ['foo'],
		flags: {
			fooBar: true,
			meow: 'dog',
			u: 'cat',
			unicorn: 'cat',
			'--': ['unicorn', 'cake']
		}
	});
});

test('`any` option', t => {
	t.is(m(['--foo=bar', 'bar'], {
		any: ['foo']
	}).flags.foo, 'bar');

	t.is(m(['--foo', 'bar'], {
		any: ['foo']
	}).flags.foo, true);

	t.is(m(['bar'], {
		any: ['foo']
	}).flags.foo, false);

	t.is(m(['bar'], {
		default: {foo: true},
		any: ['foo']
	}).flags.foo, true);

	t.is(m(['bar'], {
		default: {foo: 'bar'},
		any: ['foo']
	}).flags.foo, 'bar');
});

test('type inference', t => {
	t.deepEqual(m(['0']).input, ['0']);
	t.deepEqual(m(['0'], {string: ['_']}).input, ['0']);
	t.deepEqual(m(['0'], {inferType: true}).input, [0]);

	t.deepEqual(m(['0'], {
		inferType: true,
		string: ['foo']
	}).input, [0]);

	t.deepEqual(m(['0'], {
		inferType: true,
		string: ['_', 'foo']
	}).input, [0]);
});

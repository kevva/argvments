# argvments [![Build Status](https://travis-ci.org/kevva/argvments.svg?branch=master)](https://travis-ci.org/kevva/argvments)

> Parse command line arguments

If you're looking to use this in a CLI app, you probably want [`meow`](https://github.com/sindresorhus/meow) instead.


## Install

```
$ npm install argvments
```


## Usage

```
$ ./unicorn.js foobar --rainbow
```

```js
const argvments = require('argvments');

argvments(process.argv.slice(2));
/*
	{
		input: ['foobar'],
		flags: {
			rainbow: true
		}
	}
*/
```


## API

### argvments(input, [options])

#### input

Type: `Array`

Arguments to parse.

#### options

Type: `Object`

Same as [`minimist`](https://github.com/substack/minimist#var-argv--parseargsargs-opts). Keys passed to the `default` option are decamelized, so you can for example pass in `fooBar: 'baz'` and have it be the default for the `--foo-bar` flag.

##### any

Type: `Array`

In addition to the types supplied by `minimist` (`boolean` and `string`) you can also choose to treat your arguments as `any`. This will treat `--rainbow` as `true` and `--rainbow=foo` as `foo`.

```
$ ./unicorn.js --rainbow
//=> true

$ ./unicorn.js --rainbow=foo
//=> 'foo'

$ ./unicorn.js --rainbow foo
//=> true
````

##### inferType

Type: `boolean`<br>
Default: `false`

Infer the argument type.

By default, the argument `5` in `$ foo 5` becomes a string. Enabling this would infer it as a number.


## Related

* [meow](https://github.com/sindresorhus/meow) - CLI app helper


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)

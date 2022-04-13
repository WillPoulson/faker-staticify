# Faker Staticify

A basic nodejs cli utility to remove the usage of faker within spec files and replace with static mocks within a directory. 

## Installation

```bash
npm install faker-staticify -g
```

## Usage

Simply run

```bash
faker-staticify
```

Within the project root directory, it will search out all *.spec.ts files and staticify your faker.

Please note: This package will not remove the left over imports, I recommend using something like eslint to remove the unused imports after this runs.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
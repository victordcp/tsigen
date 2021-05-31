# tsigen
A simple NodeJS application that generates Typescript interfaces based in one given database.

This project was built TRYING to keep in mind the SOLID, DDD and Package-by-feature practices.

## Supported databases
- [x] PostgreSQL
- [ ] MySQL (TODO)

## Configuration 

Edit the config.yml file corresponding to your database configurations.

## Running (Locally)

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/victordcp/tsigen.git # or clone your own fork
cd tsigen
npm i
npm run start # or build
```

This is a simples one execution time

## Next steps
- First of all, finish the main objective (currently not gerenating the interfaces)
- Review the project structure
- Implement tests
- Implement support more databases

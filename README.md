# Dietacookies

## How to install

Install [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) to easier install node & npm version. Current node version is `16.14.0` and npm version is `8.3.1`.

Install [pm2](https://pm2.keymetrics.io/). It should be installed globaly after you installed node and npm. To install it globaly use the command `npm install pm2 -g`.

To install the project use command `npm run clean-install`. It will bootstrap all the packages and install the correct dependencies.

To install new dependency use command from lerna `npx lerna add DEP@VERSION --scope=PACKAGENAME`. `PACKAGENAME` is the name of the package from package.json.

## How to build

To build the packages use the command `npm run build:all`. It will build all the packages required to start the application.

If you want to build the in watch mode, use the commad `npm run dev`. It will start the application using babel --watch.

## How to start the application

To start the server application, we are using pm2 that is called inside the bash script `start.sh`.

To use it in develop mode, with watch from pm2 use `bash start.sh [--dev | --prod]`. If you want to give permissions to the file, use `chmode +x ./start.sh`, and you can run it withot the bash commoand, like `./start.sh [--dev | --prod]`.

To start the client application use `npm run start`. It will start the nextjs servers for admin and website.

## Where to see the application

The website client is on `localhost:3000`. The admin client is on `localhost:3001`.

## Migration

The database we use is `postgresql` and to conenct to it we use `knex`. For migrations there is a npm script that runs the migrations at the start of the building process. If you want to creat a new migration, the npm script is the follow `NAME=your_migration_name npm run migrate:make`. This line will create a new migration in the `packages\_libs\database-connector\sources\src\database\migrations` that will be used for generating and updating the database structure. To run the migration separatly, for the latest use `npm run migrate:latest`, to downgrade, use `npm run migrate:downgrade`.

## Seed

The same principle applies to seeds. To create a new seed, we follow the same principle `NAME=your_seed name npm run seed:make`. The seed won't run at building process. To run seeds use the command `npm run seed:run`. This will create a ts file in `seeds` folder `packages\_libs\database-connector\sources\src\database\seeds`.

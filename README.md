# Installation

### Clone the repository

This project is a monorepo with both frontend and backend on the same repo, the first step needed to run the project is [cloning the repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository).

### Php

Make sure you have [php installed](https://www.php.net/downloads) of at least verson 8.0 or higher.

### Composer

The package manager for the backend is composer, it is necessary to [install composer](https://getcomposer.org/download/).

### Installing the frontend packages

Run the following command inside the frontend folder:

```
npm install
```

### Installing the backend packages

Run the following command inside the backend folder:

```
composer install
```

## Heroku Setup

### Heroku account and installation

Create a Heroku account: https://signup.heroku.com/dc

Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

### Creating a heroku application

Login to Heroku by running:

```
heroku login
```

To create a new Heroku application that you can push to, use the heroku create command:

```
heroku create
```

### Basic configuration for heroku app

Run the following command to generate an APP_KEY ([what is a APP_KEY](#laravel-app-key)) for laravel:

```
php artisan key:generate --show
```

and use its return value when you run this command to set the APP_KEY value on heroku:

```
heroku config:set APP_KEY=<insert return value>
```

Next its going to be necessary to change the buildpack that heroku uses by running the following commands, first run:

```
heroku config
```

And get the name of your app, then run this command to add the monorepo buildpack ([what is this buildpack](#monorepo-buildpack)) to your heroku app:

```
heroku buildpacks:add -a <your-app-name> https://github.com/lstoll/heroku-buildpack-monorepo -i 1
```

The next command is so the new buildpack knows the path to the laravel app root, which in case you didnt change its inside the folder `backend`:

```
heroku config:set APP_BASE=backend/
```

### Deploying your heroku app

Now to deploy to Heroku:

```
git push heroku master
```

If trying to deploy a specific branch use, instead of master, `<branch>:master`.

## Heroku JawsDB MySQL

This section shows 2 ways of enabling the heroku addon JawsDB ([what is JawsDB](#jawsdb)) on your heroku application. Through the CLI or through the [heroku dashboard](https://dashboard.heroku.com/).

### CLI

Enabling JawsDB MySQL can be done either via the CLI or on your app [heroku dashboard](https://dashboard.heroku.com/).

To enable via CLI run the command:

```
heroku addons:create jawsdb:kitefin --name=your-db-name --version=8.0
```

Once JawsDB has been added, a `JAWSDB_URL` setting will be available in the app configuration and will contain the MySQL connection string.

You can check if your app updated by running the command

```
heroku config
```

or checking your app environment variables on the [heroku dashboard](https://dashboard.heroku.com/).

### Heroku Dashboard

To access the [heroku dashboard](https://dashboard.heroku.com/) head over to the [Heroku login](https://id.heroku.com/login).

Select the app you wish to enable the JawsDB MySQL, click on the `Resources` tab, `Find more add-ons` and select JawsDB MySQL.

You can check if your by checking your app environment variables on the [heroku dashboard](https://dashboard.heroku.com/) or by running the command

```
heroku config
```

If the environment variable `JAWSDB_URL` is set then the JawsDB was successfully enabled in your app.

### Connecting to MySQL Workbench

To check your database on MySQL Workbench, create a new instance. The host name, username and password for the connection can be found by running the command:

```
heroku addons:open jawsdb
```

Alternatively you can reach the browser page by going to your [heroku dashboard](https://dashboard.heroku.com/), on the resources tab and then clicking on Jawsdb addon.

After deploying the app with the above configs you can run the following command to execute migrations:

```
heroku run php artisan migrate
```

## Heroku environment variables

You can set heroku environment variables through the command:

```
heroku config:set ENV_VAR=<insert variable value>
```

or through the [heroku dashboard](https://dashboard.heroku.com/).

For the dashboard approach, after login choose the app you intend on changing the environment variables, click on the settings tab, then click on `Reveal Config Vars`.

Add the variable `APP_URL` with its value being the URL for your heroku app.

## Testing Lighthouse or GraphQL changes with GraphQL Playground

You can access the GraphQL Playground ([what is the GraphQL Playground](#graphql-playground)) by going to your heroku app following address: your-heroku-app/graphql-playground

In case you want to locally run the app and use the production database you'll need to configure your `.env` file, filling the database environment variables with your JawsDB information.

To access your app's JawsDB info, run the command:

```
heroku addons:open jawsdb
```

With the info provided on the page, change the following database information inside your `.env` file accordingly:

- DB_HOST

- DB_PORT

- DB_DATABASE

- DB_USERNAME

- DB_PASSWORD

You can then run the command:

```
php artisan serve
```

And again go to `/graphql-playground`.

## Git deploy with heroku

To enable git automatic deploys on push, you need to connect your app to the GitRepo. Go to your [heroku dashboard](https://dashboard.heroku.com/), click on the deploy tab, on Deployment method click on Github and choose the appropriate repository.

After that, choose whatever branch you want to be deployed and whether you want to enable automatic deploys.

## Netlify Setup

Create your [Netlify Account](https://app.netlify.com/).

On the Team overview tab, click on `New site from Git` and select your repository and which branch you want to deploy.

Set the base directory to `frontend`.

### Netlify Environment Variables

On the site overview, go to the `Deploys` tab, then into `Deploy Settings` and under `Environment variables`, click on edit variables.

Add the following variable:

```
REACT_APP_GRAPHQL_ENDPOINT
```

with its value being the GraphQL endpoint of your server. The default is: `https://<your-heroku-app>.herokuapp.com/graphql`

## Laravel App Key

The application’s encryption key is used by Laravel to encrypt user sessions and other information. Its value will be read from the APP_KEY environment variable.

As it must comply with the rules of the selected cipher in the configuration, the easiest way to generate a valid key is using the `php artisan key:generate --show` command, which will print a key that you can copy and then paste into the next step. To know more, [read the laravel documentation](https://laravel.com/docs).

## Monorepo Buildpack

This project is a monorepo with both frontend and backend on the same repo, meaning that it's necessary to use an additional heroku buildpack in order for the building of the heroku app to occur inside the correct folder instead of heroku trying to build off of the root folder. For more information on the monorepo buildpack, [check out their buildpack page on heroku](https://elements.heroku.com/buildpacks/lstoll/heroku-buildpack-monorepo).

## JawsDB

This project makes use of the heroku addon JawsDB, you can check out the [heroku article about JawsDB](https://devcenter.heroku.com/articles/jawsdb) or [their website](https://www.jawsdb.com/) for more information.

## GraphQL Playground

GraphQL Playground is a graphical, interactive, in-browser GraphQL IDE, created by Prisma and based on GraphiQL. To know more, check out their [github repository](https://github.com/graphql/graphql-playground).

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

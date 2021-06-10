## Heroku setup

Create a Heroku account: https://signup.heroku.com/dc

Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

Login to Heroku by running:

```
heroku login
```

To create a new Heroku application that you can push to, use the heroku create command:

```
heroku create
```

The application’s encryption key is used by Laravel to encrypt user sessions and other information. Its value will be read from the APP_KEY environment variable.

As it must comply with the rules of the selected cipher in the configuration, the easiest way to generate a valid key is using the `php artisan key:generate --show` command, which will print a key that you can copy and then paste into the next step.

You can simply set environment variables using the heroku config command, so run a `heroku config:set` as the last step before deploying your app for the first time:

Run the following command to generate an APP_KEY for laravel:

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

And get the name of your app, then run:

```
heroku buildpacks:add -a <your-app-name> https://github.com/lstoll/heroku-buildpack-monorepo -i 1
```

The next command is so the new buildpack knows the path to the laravel app root, which in case you didnt change its inside the folder `Backend`:

```
heroku config:set APP_BASE=Backend/
```

Now to deploy to Heroku:

```
git push heroku master
```

If trying to deploy a specific branch use, instead of master, `<branch>:master`.

## Heroku JawsDB MySQL

### CLI

Enabling JawsDB MySQL can be done either via the CLI or on your app heroku dashboard.

To enable via CLI run the command:

```
heroku addons:create jawsdb:kitefin --name=your-db-name --version=8.0
```

Once JawsDB has been added, a `JAWSDB_URL` setting will be available in the app configuration and will contain the MySQL connection string.

You can check if your app updated by running the command `heroku config` or checking your app environment variables on the Heroku dashboard.

### Heroku Dashboard

To access the heroku dashboard head over to the [Heroku login](https://id.heroku.com/login).

Select the app you wish to enable the JawsDB MySQL, click on the `Resources` tab, `Find more add-ons` and select JawsDB MySQL.

You can check if your app updated by running the command `heroku config` or checking your app environment variables on the Heroku dashboard.

If the `JAWSDB_URL` is set then the JawsDB was successfully enabled in your app.

### Connecting to MySQL Workbench

To check your database on MySQL Workbench, create a new instance. The host name, username and password for the connection can be found by running the command:

```
heroku addons:open jawsdb
```

Alternatively you can reach the browser page by going to your heroku dashboard, on the resources tab and then clicking on Jawsdb addon.

After deploying the app with the above configs you can run the following command to execute migrations:

```
heroku run php artisan migrate
```

## Heroku environment vars

You can set heroku env vars through the command: `heroku config:set ENV_VAR=<insert variable value>` or through the heroku dashboard.

For the dashboard approach, after login choose the app you intend on changing the env variables, click on the settings tab, then click on `Reveal Config Vars`.

Add the variable `APP_URL` with its value being the URL for your heroku app.

## Git deploy with heroku

To enable git automatic deploys on push, you need to connect your app to the GitRepo. Go to your heroku dashboard, click on the deploy tab, on Deployment method click on Github and choose the appropriate repository.

After that choose whatever branch you want to be deployed and whether you want to enable automatic deploys.

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

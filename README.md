# Local Installation

## Installing necessary tools

### Step 1 - Clone the repository

This project is a monorepo with both frontend and backend on the same repo, the first step needed to run the project is [cloning the repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository).

### Step 2 - Install Php

Make sure you have [php installed](https://www.php.net/downloads) of at least verson 8.0 or higher.

### Step 3 - Install MySQL

To install MySQL [click here](https://dev.mysql.com/downloads/installer/) to go to their website.

### Step 4 - Install Composer

The package manager for the backend is composer, it is necessary to [install composer](https://getcomposer.org/download/).

### Step 5 - Install Node Package Manager

This installation guide was built taking into account that the package manager for the frontend is Node Package Manager, or NPM. To install NPM, visit [their website](https://www.npmjs.com/get-npm).

### Step 6 - Install the frontend packages

Run the following command **inside the frontend folder**:

```
npm install
```

### Step 7 - Install the backend packages

Run the following command **inside the backend folder**:

```
composer install
```

## Local Database setup

### Step 1 - Create a Local MySQL database

To create a local MySQL database, open your MySQL Workbench and add a new connection.

Switch the hostname to `localhost`, choose your username and password.

### Step 2 - Configuring the backend to connect to local database

To connect to the local MySQL database you'll need to update your `.env` file inside the folder `backend`. In case you don't have a `.env` file just create one, and copy the contents of the `.env.example` file inside it.

Inside the `.env` file change the following environment variables value to match your local MySQL database:

- DB_HOST
- DB_PORT
- DB_DATABASE
- DB_USERNAME
- DB_PASSWORD

### Step 3 - Testing connection by running migrations

To test the connection to the local mysql database we are going to run the migrations by running the following command on the terminal while **inside the backend folder**:

```
php artisan migrate
```

If successful, check your local database through the MySQL Workbench to see the newly created tables.

### Step 4 - Seeding tables

To seed the timelines table and historical_events table with some data, run the following command while **inside the backend folder**:

```
php artisan db:seed
```

Check your MySQL Workbench, the timlines and historical_events tables should have some data now!

### Step 5 - Seed the user table with admin user

To create your first admin user, run the following command while **inside the backend folder**:

```
php artisan db:seed --class=AdminUserSeeder
```

It will create a admin user with the following information:

```
{
    name: admin
    password: 123
    email: admin@email.com
}
```

### Step 6 - Run backend locally

Run the backend locally by running the following command **inside the backend folder**:

```
php artisan serve
```

You can now enter the given address `/graphql-playground` to query your database through graphql.

# Remote Backend Setup

## Heroku Setup

### Step 1 - Heroku account and installation

Create a Heroku account: https://signup.heroku.com/dc

Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

### Step 2 - Creating a heroku application

Login to Heroku by running **inside the backend folder**:

```
heroku login
```

To create a new Heroku application that you can push to, use the heroku create command **inside the backend folder**:

```
heroku create
```

### Step 3 - Basic configuration for heroku app

Run the following command **inside the backend folder** to generate an APP_KEY ([what is a APP_KEY](#laravel-app-key)) for laravel:

```
php artisan key:generate --show
```

and use its return value when you run this command **inside the backend folder** to set the APP_KEY value on heroku:

```
heroku config:set APP_KEY=<insert return value>
```

Also, use the APP_KEY value to set the APP_KEY environment variable inside the `.env` file inside your `backend` folder.

Next its going to be necessary to change the buildpack that heroku uses by running the following commands, first run **inside the backend folder**:

```
heroku config
```

And get the name of your app, then run this command **inside the backend folder** to add the monorepo buildpack ([what is this buildpack](#monorepo-buildpack)) to your heroku app:

```
heroku buildpacks:add -a <your-app-name> https://github.com/lstoll/heroku-buildpack-monorepo -i 1
```

After that add the ImageMagick build pack using the following command **inside the backend folder**:

```
heroku buildpacks:add -a <your-app-name> https://github.com/ReisTecnologia/heroku-buildpack-imagemagick -i 2
```

After that add the heroku/php build pack using the following command **inside the backend folder**:

```
heroku buildpacks:add -a <your-app-name> heroku/php -i 3
```

The next command is so the new buildpack knows the path to the laravel app root, which in case you didnt change its inside the folder `backend`, make sure to run it **inside the backend folder**:

```
heroku config:set APP_BASE=backend/
```

### Step 4 - Deploying your heroku app

Now to deploy to Heroku:

```
git push heroku master
```

In case your heroku git remote isnt created at this point, you can run the following command while **inside the backend folder** to create it:

```
heroku git:remote -a <your-app-name>
```

If trying to deploy a specific branch use, instead of master, `<branch>:master`.

## Remote Database Setup - JawsDB MySQL

This section shows 2 ways of enabling the heroku addon JawsDB ([what is JawsDB](#jawsdb)) on your heroku application. Through the CLI or through the [heroku dashboard](https://dashboard.heroku.com/).

### Step 1 - JawsDB via CLI

To enable via CLI, run the command **inside the backend folder**:

```
heroku addons:create jawsdb:kitefin --name=your-db-name --version=8.0
```

Once JawsDB has been added, a `JAWSDB_URL` setting will be available in the app configuration and will contain the MySQL connection string.

You can check if your app updated by running the command **inside the backend folder**:

```
heroku config
```

or checking your app environment variables on the [heroku dashboard](https://dashboard.heroku.com/).

([How to do this through the heroku dashboard](#jawsdb-mysql-heroku-dashboard)).

### Step 2 - Check your remote database

Go to your heroku application and access the Graphql Playground, through the address: `<your-app-name>.herokuapp.com/graphql-playground`

## Setting up the email server

If you wish to make use of the forgot my password feature, you need to choose a SMTP or email sender service to help you.

On this section we will be guiding you through our SMTP of choice [SendInBlue](https://app.sendinblue.com/account/login). Which provides 300 free emails daily.

### Step 1 - Create account and fill up your profile form

First you need to create your [SendInBlue](https://app.sendinblue.com/account/login) account and complete your profile form, those are the pre-requisites to be able to use their transactional email service.

### Step 2 - Gather your SMTP information

Under your account options - on the top right corner of the dashboard - choose the [SMTP & API](https://account.sendinblue.com/advanced/api) option.

After that click on the SMTP tab to check your SMTP settings.

It should have the following information:

- SMTP Server
- Port
- Login
- Password

In case you have trouble finding the SMTP & API section, the first time you enter the Transactional tab it should display this information.

### Step 3a - Configuring your .env file

For your local testing you'll need to use the SMTP information gathered above and use it on the following variables:

MAIL_MAILER=smtp
MAIL_HOST= the SMTP Server info
MAIL_PORT= the Port info
MAIL_USERNAME= the Login info
MAIL_PASSWORD= the Password info
MAIL_FROM_ADDRESS= the Login info
MAIL_FROM_NAME= name you wish your sender has
APP_URL= the localhost for the frontend / i.e. `http://localhost:8888`

### Step 3b - Configuring your heroku config vars

When deploying with heroku you'll need to provide the same vars from the Step 3a

You can with a single command executed **inside the backend folder** set up all the vars from your console, switching `variableValue` for the appropriate value:

```
heroku config:set MAIL_MAILER=smtp MAIL_HOST=variableValue MAIL_PORT=variableValue MAIL_USERNAME=variableValue MAIL_PASSWORD=variableValue MAIL_FROM_ADDRESS=variableValue MAIL_FROM_NAME=variableValue APP_URL= url for the frontend of the app
```

or through the [heroku dashboard](https://dashboard.heroku.com/).

## Setting up the storage service

### Step 1 - Creating your s3 Bucket

We chose to store our images for the app on the Amazon s3.

You'll need to create an s3 bucket, which can easily be achieved by entering the S3 option on the Services tab on the AWS website.

### Step 2 - Configure your bucket

You'll need to set up the objects in your bucket to be publicly accessible, in order for the frontend client to access and load the images from s3.

You can do that by acessing your bucket, going to Permissions tab and configuring the public access policy.

You'll need to configure the buckets policy to allow read access to objects, you can use the following:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YourBucketName/*"
        }
    ]
}
```

You'll also need to configure a CORS policy, which is also on the Permissions tab, we recommend the following:

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

### Step 3a - Environment Variables Netlify

You'll need to setup a couple of environment variables in order for the uploading and reading of files to and from s3 to work correctly.

On your Netlify you'll need to configure the following variable on your dashboard:

- REACT_APP_UPLOAD_TOKEN_ENDPOINT

With `REACT_APP_UPLOAD_TOKEN_ENDPOINT` value being the endpoint of the uploadToken API. That being, for remote: https://yourHerokuApp.com/api/uploadToken.

For local, when you serve with php just add the path `/api/uploadToken` to the address that is provided, for example `127.0.0.1:6000/api/uploadToken` if your php served at the address `127.0.0.1:6000`.

### Step 3b - Environment Variables Heroku

On your heroku you'll need to configure the following variables, these configs are also needed in your .env file for local uploading:

- AWS_ACCESS_KEY_ID= Your AWS ACCESS KEY
- AWS_SECRET_ACCESS_KEY= Your AWS SECRET ACCESS KEY
- AWS_DEFAULT_REGION= Your region for example sa-east-1 for South America
- AWS_BUCKET= The name of your bucket

You can configure these either in the [heroku dashboard](https://dashboard.heroku.com/) or through the console command:

```
heroku config:set AWS_ACCESS_KEY_ID= Your AWS ACCESS KEY AWS_SECRET_ACCESS_KEY= Your AWS SECRET ACCESS KEY AWS_DEFAULT_REGION= Your region for example sa-east-1 for South America AWS_BUCKET= The name of your bucket
```

## Heroku Environment Variables

You can set heroku environment variables through the command:

```
heroku config:set ENV_VAR=<insert variable value>
```

or through the [heroku dashboard](https://dashboard.heroku.com/).

For the dashboard approach, after login choose the app you intend on changing the environment variables, click on the settings tab, then click on `Reveal Config Vars`.

Add the variable `APP_URL` with its value being the URL for your heroku app.

## Connecting to remote Database through MySQL Workbench

To check your database on MySQL Workbench, create a new instance. The host name, username and password for the connection can be found by running the command:

```
heroku addons:open jawsdb
```

Alternatively you can reach the browser page by going to your [heroku dashboard](https://dashboard.heroku.com/), on the resources tab and then clicking on Jawsdb addon.

After deploying the app with the above configs you can run the following command while **inside backend folder** to execute migrations and seeds:

```
heroku run php artisan migrate --seed
```

In case you want to locally run the app and use the production database you'll need to configure your `.env` file, filling the database environment variables with your JawsDB information.

To access your app's JawsDB info, run the command **inside the backend folder**:

```
heroku addons:open jawsdb
```

## Connecting to remote database whilst running backend locally

If you dont have a `.env` file, create one inside the backend folder, and copy the contents of `.env.example`

With the info provided on the page, change the following database information inside your `.env` file accordingly, :

- DB_HOST

- DB_PORT

- DB_DATABASE

- DB_USERNAME

- DB_PASSWORD

You can then run the command **inside the backend folder**:

```
php artisan serve
```

To migrate and seed your local database after configuration, run the following command **inside the backend folder**:

```
php artisan migrate --seed
```

## GraphQL Playground

You can access the GraphQL Playground ([what is the GraphQL Playground](#graphql-playground)) by going to your heroku app following address: your-heroku-app/graphql-playground

If you are running the backend locally the adress would be whatever local address you chose plus `/graphql-playground`. For example localhost/graphql-playground.

## Git deploy with heroku

To enable git automatic deploys on push, you need to connect your app to the GitRepo. Go to your [heroku dashboard](https://dashboard.heroku.com/), click on the deploy tab, on Deployment method click on Github and choose the appropriate repository.

After that, choose whatever branch you want to be deployed and whether you want to enable automatic deploys.

# Remote Frontend Setup

## Netlify Setup

### Step 1 - Create Netlify Account

Create your [Netlify Account](https://app.netlify.com/).

### Step 2 - Create new site and set base directory

On the Team overview tab, click on `New site from Git` and select your repository and which branch you want to deploy.

Set the base directory to `frontend`.

### Step 3 - Netlify Environment Variables Setup

On the site overview, go to the `Deploys` tab, then into `Deploy Settings` and under `Environment variables`, click on edit variables.

Add the following variables:

```
REACT_APP_GRAPHQL_ENDPOINT
```

with its value being the GraphQL endpoint of your server. The default is: `https://<your-heroku-app>.herokuapp.com/graphql`

```
REACT_APP_IMAGES_ENDPOINT
```

with its value being the backend endpoint that handles image requests for the app. The default is: `https://<your-heroku-app>.herokuapp.com/images`

### Step 4 - Check your deploy

On your netlify `Team Overview` select your site, if its not deployed yet, click in the `Deploy` tab and trigger deploy!

## Running the Frontend Locally

### Running the Frontend Locally Pointing to remote backend

You can run the frontend locally pointing to remote backend by running the following command **while inside the frontend folder**:

```
REACT_APP_GRAPHQL_ENDPOINT=https://<your-heroku-app>.herokuapp.com/graphql ntl dev
```

Remember you can check if its correctly connected by running queries on the GraphQL Playground.

### Running the Frontend Locally Pointing to local backend

You can run the frontend locally pointing to remote backend by running the following command **while inside the frontend folder**:

```
REACT_APP_GRAPHQL_ENDPOINT=https://<your-local-backend-address>/graphql ntl dev
```

Remember you can check if its correctly connected by running queries on the GraphQL Playground.

### Step 5 - Adding a Custom Domain (optional)

Netlify lets you serve your application on custom domains that you own. To make use of this feature go to your apps `Site overview` tab and click `Domain settings`.

Under `Custom domains` you click `Add domain alias` and insert your custom domain.

A new Primary domain has been added, now click on `Check DNS configuration` and use the given configuration on your domain provider to link them.

It could take between a few minutes to a handful of hours for the DNS propagation to occur and your app to be properly displayed in the new custom domain you set up.

### Step 6 - Adding Bugsnag (optional)

We have Bugsnag setup on this app, to make use of it you're going to need a [Bugsnag Account](https://www.bugsnag.com/). After creating your account you'll need to create 2 different projects, one for the backend and one for the frontend of the app. Once you create the projects on your bugsnag you'll need to setup the environment variables using the `Notifier API key`.

For the backend you'll need to add on your `.env` file a `BUGSNAG_API_KEY` with it's value being the `Notifier API key` of the backend project you created on bugsnag.

For the frontend you'll need to add a environment variable to your Netlify `REACT_APP_BUGSNAG_API_KEY` with it's value being the `Notifier API key` of the frontend project you created on bugsnag.

## Laravel App Key

[Laravel Docs](https://laravel.com/docs).

## Monorepo Buildpack

[Monorepo Buildpack Page](https://elements.heroku.com/buildpacks/lstoll/heroku-buildpack-monorepo).

## JawsDB MySQL Heroku Dashboard

Access your [heroku dashboard](https://dashboard.heroku.com/).

Select the app you wish to enable the JawsDB MySQL, click on the `Resources` tab, `Find more add-ons` and select JawsDB MySQL.

You can check if your by checking your app environment variables on the dashboard or by running the command

```
heroku config
```

If the environment variable `JAWSDB_URL` is set then the JawsDB was successfully enabled in your app.

## JawsDB

[Heroku article about JawsDB](https://devcenter.heroku.com/articles/jawsdb) / [JawsDB Website](https://www.jawsdb.com/) for more information.

## GraphQL Playground

[Graphql Playground Github Repo](https://github.com/graphql/graphql-playground).

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

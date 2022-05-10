# Decoupled Drupal with React

A demo for decoupling Drupal with React (using Typescript template). Drupal delivers data via a custom GraphQL schema.
Data creation is possible for authenticated users only.

## Lando

The backend (Drupal 9) runs on a [Lando](https://docs.lando.dev/config/drupal9.html) environment with PHP 8.1. Lando is
optional, but eases and speeds up the setup.

Run the following command to start the lando environment:

```shell
# Execute in root
lando start
```

You should now be able to connect to the container on https://decoupled-drupal-react.lndo.site.

If you're starting from scratch there will be a "File not found"-error, as the backend is not installed yet (see next
section).

## Installation instructions - backend (Drupal)

### Install backend dependencies

The backend (Drupal) part is based on the drupal-composer project, so that
[most of its' documentation](https://github.com/drupal-composer/drupal-project) should apply here too.

Run following commands to get files needed for your Drupal installation:

```shell
# Execute in /backend
lando composer install
```

### Local settings

Use local settings - in `/backend/web/sites/default/` copy `settings.local.php.example` to `settings.local.php`. For
now this only increases the memory limit for the CLI (Drush), but normally settings like database credentials would go
in there.

### Install Drupal

Install Drupal with the predefined configuration:

```shell
# Execute in /backend
lando drush si minimal --db-url=mysql://drupal9:drupal9@database/drupal9 --account-pass=admin --existing-config --yes
```

You should now be able to see Drupal 9 running at https://decoupled-drupal-react.lndo.site.

### Setup OAuth

#### Create consumer

Create a new user and give it the role "OAuth".

Go to `/admin/config/services/consumer` and create a new consumer:

* Label: "React"
* User: choose the just created user with the "OAuth" role
* New Secret: add a secret
* Scopes: Check the "Oauth" role

Save and note the UUID of the consumer created. Optionally delete the "Default Consumer", created when the module was
installed.

#### Setup Simple OAuth

Go to `/admin/config/people/simple_oauth` and click on "Generate keys" at the bottom. Use `../keys` as the directory for
the keys when prompted. Save the configuration.

## Installation instructions - frontend (React)

### Install frontend dependencies

Run following commands to download the dependencies and start the development server:

```shell
# Execute in /frontend
lando npm install
```

### Setup frontend environment

In `/frontend` copy `.env.local.example` to `.env.local`. Fill in the following values:

* `REACT_APP_OAUTH_CLIENT_ID`: (the UUID of the consumer)
* `REACT_APP_OAUTH_CLIENT_SECRET`: (the secret of the consumer)
* `REACT_APP_OAUTH_GRANT_TYPE`: password (the type is `password`)
* `REACT_APP_OAUTH_SCOPE`: oauth (this is the machine name of the role, selected as "Scopes" in the consumer)

Change the other values in `.env.local` if needed, especially the `REACT_APP_DRUPAL_URL`.

### Start app

```shell
# Execute in /frontend
lando npm start
```

Open http://localhost:3000 to view it in the browser.

## Functionalities

You can view a list of players, view single player data or create a new one.

Creating a new player is only possible as authenticated user with the role "editor". Players created via the Drupal
backend will also be shown in the frontend app.

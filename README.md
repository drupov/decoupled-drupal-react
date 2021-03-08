# Decoupled Drupal 9 with React

## Lando

The backend (Drupal 9) runs on a [lando](https://docs.lando.dev/config/drupal9.html) environment with PHP 7.4.

Run the following command to start the lando environment:
```
# Execute in root
lando start
```
You should now be able to connect to the container on
[https://decoupled-drupal-react.lndo.site](https://decoupled-drupal-react.lndo.site).

If you're starting from scratch there will be a "File not found"-error, as the backend is not installed yet (see next
section).

## Installation instructions - backend
The backend (Drupal) part is based on the drupal-composer project, so that
[most of its' documentation](https://github.com/drupal-composer/drupal-project) should apply here too.

Run following commands to get files needed for your Drupal installation:
```
# Execute in /backend
lando composer install
```
Install Drupal with the predefined configuration:
```
# Execute in /backend
lando drush si minimal --db-url=mysql://drupal9:drupal9@database/drupal9 --account-pass=admin --existing-config --yes
```
You should now be able to see a fully installed Drupal 9 at
[https://decoupled-drupal-react.lndo.site](https://decoupled-drupal-react.lndo.site).

Import all configuration
```
# Execute in /backend
lando drush cim -y
```

## Installation instructions - frontend

Run following commands to download the dependencies and start the development server:
```
# Execute in /frontend
lando npm install
lando npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Functionalities
You can view a list of articles, view single articles or create a new article through the frontend. Articles
created via the Drupal backend will also be shown in the frontend app.

# Drupal 8 Decoupled PoC

## Lando
The backend runs on a [lando](https://docs.devwithlando.io/tutorials/drupal8.html) environment with with PHP 7.2.

Run the following command to start the lando environment:
```
# Execute in /backend
lando start
```
You should now be able to connect to the container on [https://d8-decoupled.lndo.site](https://d8-decoupled.lndo.site).

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
lando drush si config_installer --db-url=mysql://drupal8:drupal8@database/drupal8 --account-pass=admin --yes
```
You should now be able to see a fully installed Drupal 8 at [https://d8-decoupled.lndo.site](https://d8-decoupled.lndo.site).

Import all configuration
```
lando drush csim -y
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

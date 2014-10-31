# DasReviewer

DasReviewer is an AngularJS application for the CodeReview, used with [DasReviewer - API](https://github.com/ngotchac/dasreviewer-api).

## Usage

Only two steps (might need a `sudo`):
```bash
npm install && bower install
```

```bash
grunt serve
```

This application is linked to a NodeJS server, that should be, by default, run on local. To use a different server, modify the `app/scripts/app.js` => `RestangularProvider.setBaseUrl(http://www.xxx.zzz:666)`.

## Ubuntu 12.04

One might need to install Ruby, Sass & Compass (Ubuntu 12.04 - from [here](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-on-ubuntu-12-04-lts-precise-pangolin-with-rvm)):
```bash
sudo gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
\curl -L https://get.rvm.io |  sudo bash -s stable --ruby --autolibs=enable --auto-dotfiles
sudo su

source /usr/local/rvm/scripts/rvm
rvm requirements

gem install sass
gem install compass
```
Then add `source /usr/local/rvm/scripts/rvm` to your .bashrc

That's all folks!

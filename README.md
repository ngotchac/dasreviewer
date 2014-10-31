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

That's all folks!

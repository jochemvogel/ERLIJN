# ERLIJN ✈️

**[Live link](https://erlijn.herokuapp.com/)**

ERLIJN is a search engine for (cheap) flights where you can search and book flights.

_This app is created during the Progressive Web Apps course in the Minor Web Design & Development (20-21). Could use it in the future to learn new things._

### Table of Contents

<table>

<tr>
    <td align="center"><a href="#nerd_face-usage">🤓 Usage<a></td>
    <td align="center"><a href="#gear-installation">⚙️ Installation<a></td>
    <td align="center"><a href="#open_file_folder-folder-structure">🗂 Folder Structure<a></td>
    <td align="center"><a href="#package-api-endpoints-structure">📦 API Structure<a></td>
    <td align="center"><a href="#construction_worker-service-worker">👷‍♂️ Service Worker<a></td>
    <td align="center"><a href="#rocket-optimisations">🚀 Optimisations<a></td>
    <td align="center"><a href="#memo-backlog">📝 Backlog<a></td>
</tr>

</table>

## :nerd_face: Usage

Search for a location and click on search. Thereafter a few cards with quotes will appear. On this cards you can find a **`Checkout`** button. Click on this and a checkout page with details about the flight/quote will appear.

### Screenshot

![Frontend ](https://github.com/jochemvogel/minor-web/blob/master/wafs/assets/img/screenshot_app.png)

<a href="installation"></a>

## :gear: Installation

### Get it local

This app is made with vanilla JS (frontend) and NodeJS (backend).

#### 1). Clone the repository

`git clone https://github.com/jochemvogel/progressive-web-apps-2021.git `

#### 2). Install dependencies

`npm install`

#### 3). Get an API key

Go to [RapidApi.com](https://rapidapi.com/skyscanner/api/skyscanner-flight-search) and click on **Sign Up** in the top right corner. When you've done this, return back to the previous URL and you can use the API. The API has no rate limit.

Copy the `.env.example` file, change the name to `.env` and update the value of the `API_KEY=` to the API key you got from RapidApi. Then set `IS_DEVELOPMENT` to true in your own `.env`.

#### 4). Start development environment

`npm run dev` (Will build & watch automatically)

#### 5). Watch files (manual)

`npm run watch`

#### 6). Build files (manual)

`npm run build`

## :open_file_folder: Folder Structure

<details>

<summary>Screenshot folder structure</summary>

![Folder structure](https://i.ibb.co/Dtnx8Vd/Screenshot-2021-03-26-at-11-28-39.png)

</details>

### models

All the data is getting fetch (and processed) in this folder.

### views

All the (EJS) views can be found here. There is a `/pages` and a `/partials` folder located.

### controllers

The render controller is located in this folder. Controllers are the 'middleman' between the views & models and reacts to user interaction.

### routes

All the routes (with it's render functions) are located in `routes/routes.js`.

### scripts

Here are all the build scripts located.

### src

All the js, css and assets are located in this folder. When you build, those files will be optimized and placed in the `/public` folder. All the files in thet `src/assets/` folder will be place in the 'root' of `/public`. The rest will be placed in their dedicated folder.

### public

This folder is not visible (on default). After you build, the `/public` folder will be created.

## :package: API Endpoints Structure

What's inside the API (structure/objects).

The documentation and all the (interactive) endpoints kan be found [here](https://rapidapi.com/skyscanner/api/skyscanner-flight-search).

Examples of the two used endpoints will be listed below:

### Places

This endpoint is used to fetch user friendly locations like **_Amsterdam_** to locations the Quotes endpoint understands like **_AMS-sky_**

#### Parameters

_query_: **Nederland**

_country_: **Nederland**

_currency_: **EUR**

_locale_: **nl-NL**

#### Output

<details>
<summary>See the output</summary>

```json
{
    "Places": [
        {
            "PlaceId": "NL-sky",
            "PlaceName": "Nederland",
            "CountryId": "NL-sky",
            "RegionId": "",
            "CityId": "-sky",
            "CountryName": "Nederland"
        },

        {
            "PlaceId": "AMS-sky",
            "PlaceName": "Amsterdam Schiphol",
            "CountryId": "NL-sky",
            "RegionId": "",
            "CityId": "AMST-sky",
            "CountryName": "Nederland"
        },
        {
            "PlaceId": "EIN-sky",
            "PlaceName": "Eindhoven",
            "CountryId": "NL-sky",
            "RegionId": "",
            "CityId": "EIND-sky",
            "CountryName": "Nederland"
        },
        {
            "3, 4, 5, 6, 7, 8, 9": "Same for: Rotterdam, Maastricht, Groningen etc."
        }
    ]
}
```

</details>

Small side note: It will list all the location that has the query in his name. For example: all the airports in `Caribisch Nederland` will also be included in the query `Nederland`. Be aware of that.

### Browse Flight Prices (Browse Quotes)

#### Parameters

_country_: **US**

_currency_: **USD**

_locale_: **en-US**

_originplace_: **SFO-sky** (San Fransisco)

_destinationplace_: **JFK-sky** (New York)

_outboundpartialdate_: **2021-02-10**

#### Output

 <details>

<summary>See the output</summary>

```json
{
    "Quotes": [
        {
            "QuoteId": 1,
            "MinPrice": 220,
            "Direct": true,
            "OutboundLeg": {
                "CarrierIds": [851],
                "OriginId": 81727,
                "DestinationId": 60987,
                "DepartureDate": "2021-02-10T00:00:00"
            },
            "QuoteDateTime": "2021-02-08T08:21:00"
        }
    ],
    "Carriers": [
        {
            "CarrierId": 851,
            "Name": "Alaska Airlines"
        }
    ],
    "Places": [
        {
            "Name": "New York John F. Kennedy",
            "Type": "Station",
            "PlaceId": 60987,
            "IataCode": "JFK",
            "SkyscannerCode": "JFK",
            "CityName": "New York",
            "CityId": "NYCA",
            "CountryName": "United States"
        },
        {
            "Name": "San Francisco International",
            "Type": "Station",
            "PlaceId": 81727,
            "IataCode": "SFO",
            "SkyscannerCode": "SFO",
            "CityName": "San Francisco",
            "CityId": "SFOA",
            "CountryName": "United States"
        }
    ],
    "Currencies": [
        {
            "Code": "USD",
            "Symbol": "$",
            "ThousandsSeparator": ",",
            "DecimalSeparator": ".",
            "SymbolOnLeft": true,
            "SpaceBetweenAmountAndSymbol": false,
            "RoundingCoefficient": 0,
            "DecimalDigits": 2
        }
    ]
}
```

</details>

## :construction_worker: Service Worker

During this course I learned to make a PWA (based on the app I made in WAFS). One aspect of it was server side rendering (with Node). I'd never (really) worked with Node (and EJS) before, so in the beginning it was hard to understand everything. Beside that we also learned how to work with service workers and manifests. Last but no least I research a lot about caching and implemented those things in the service worker and the building scripts.

I haven't covered everything that is possible with the service worker, yet. There was so much to do. You can fill your whole day with learning about, caching or PWAs in general or Node or building scripts etc.

Overall I think I have a good understanding what service workers can do, but I'm sure I do not know everything about it.

### Why do you need a service worker for this app?

Imagine you're in a country outside Europe and you don't have internet (besides shitty hotel Wifi). Suddenly your sister calls and says that her baby is born. You really want to see it and decided to book a last minute flight to home for the next day via ERLIJN. It's your last day at this sunny destination, so you want to enjoy the sun and the beach. Because of that you're a little bit late for your flight, so you're in a hurry and a little bit stressed out. You booked a cap and went to the airport. While sitting in the cap (with no internet) you no longer knew what time the flight was. You want to visit ERLIJN to see all the flight details (you're in such a hurry that you didn't thought about the flight confirmation mail). Fortunately the developers implemented the wonderful service worker, so you can see the details of the flight you visited before. You see that you have enough time left and you'll be reunited with your family within a few hours. What a wonderful story and it all started with the service worker. ❤️

## :rocket: Optimisations

### Performance bingo

#### Optimising the critical rending path

Reducing the time that a browser needs for rendering the page.

#### First view

First View is all about optimising the first meaningful paint. It's (like the name suggests) the first time a user visits your page (without cookies & cache of course). Optimising for the First View means render something meaningful as soon as possible.

#### Repeat view

The Repeat View represents what someone will see if they are coming back to the page some time after visiting it the first time. The Repeat View is all about bytes and caching strategies.

#### Perceived performance

This is all about perception. How long does it takes (in de mind of the user) to load your application. You can 'improve' this by adding (small) animations/transitions that'll make you application looks smooth. The user thinks that loading will take less longer.

#### Runtime performance

This is about how the application performs while it's running. Does a button click gives the user immediate feedback or does it takes some time? Are routes loading fast or not?

#### Time to first byte

This is the time between the moment the user sends a request (i.e. a reload or a button click) and the moment that the first byte on the page is received (how fast does the server respond). If you have a pre rendered (static) site: this will be very fast. The server serves a static HTML file

#### First meaningful paint

This is all about the primary content. This is the moment that the biggest part of the 'above-the-fold' layout change has happened and the web fonts are loaded. It is when the website becomes useful.

#### Time to Interaction

This is the between the moment the user sends a request and the user is able to interact with the website.

### Optimisations I did

#### NPM Scripts

```json

"scripts": {
    "start":  "node",
    "dev":  "nodemon & npm run build & npm run watch",
    "prebuild":  "rimraf ./public",
    "build":  "npm-run-all build:* && npm run revision",
    "build:css":  "node scripts/build-css.js",
    "build:js":  "node scripts/build-js.js",
    "build:assets":  "node scripts/build-assets.js",
    "build:img":  "node scripts/build-img.js",
    "build:revision":  "node scripts/revision/revision-hash.js",
    "revision":  "node scripts/revision/replace-ejs.js & node scripts/revision/replace-sw.js",
    "watch":  "npm-run-all watch:*",
    "watch:css":  "chokidar \"src/css/*.css\" --c \"npm run build:css\"",
    "watch:js":  "chokidar \"src/js/*.js\" --c \"npm run build:js\"",
    "watch:assets":  "chokidar 'src/**/*.*' --command 'npm run build:static:assets'"
},

```

Most of the scripts are straight forward. The difference between `build:revision` and `revision` is that `build:revision` will make the `rev-manifest.json` and create the new versioned files, while `revision` rewrites the references in the header, footer & service worker. Not really satisfied with the naming, but I can't really come up with better names.

#### Build scripts

##### [`scripts/build-js.js`](https://github.com/jochemvogel/progressive-web-apps-2021/blob/master/scripts/build-js.js)

All the (client side) scripts are getting concatenated and minified (`terser`) to one file (`bundle.min.js`) and placed in the `public/js` directory.

##### [`scripts/build-css.js`](https://github.com/jochemvogel/progressive-web-apps-2021/blob/master/scripts/build-css.js)

First all the css is getting concatenated, then it's getting formatted (with cleanCSS) and eventually it's getting post processed (with autoprefixer). The bundled file will be placed in the `public/css` directory.

##### [`scripts/build-assets.js`](https://github.com/jochemvogel/progressive-web-apps-2021/blob/master/scripts/build-assets.js)

It copies all the assets and place it in the `/public` folder. There is also another script named `build-img.js`. It's basically doing the same, but it has a different output directory.

##### [`scripts/revision/revision-hash.js`](https://github.com/jochemvogel/progressive-web-apps-2021/blob/master/scripts/revision/revision-hash.js)

This file creates versioned files of the minified js and css for caching purposes. It also creates a `rev-manifest.json`, so other scripts can rewrite the references to those files based on the `rev-manifest.json`.

##### [`scripts/revision/replace-ejs.js`](https://github.com/jochemvogel/progressive-web-apps-2021/blob/master/scripts/revision/replace-ejs.js)

The references to `css/min.bundle.css` and `js/min.bundle.js` (in the header and footer) will be replaced to the hashed version.

##### [`scripts/revision/replace-sw.js`](https://github.com/jochemvogel/progressive-web-apps-2021/blob/master/scripts/revision/replace-sw.js)

The references to `css/min.bundle.css` and `js/min.bundle.js` (in the service worker) will be replaced to the hashed version. This is another file, because the target location (`/public`) differs from the ejs files.

### Local fonts

First I used Google Fonts (and their URL). I choose to use local fonts to reduce the amount of external style sheets. Thanks to [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts) the fonts are now served locally (improved the _performance_ on Lighthouse with 12 points ^^)

Because of that I received almost 100/100 in Lighthouse (see screenshot).

![Lighthouse result](https://i.ibb.co/jWy1jwM/Screenshot-2021-03-23-at-14-03-43.png)

The only three improvements were:

1.  Reduce initial server response time (Heroku thing)

2.  Preload key requests (No idea how to fix this. I use local fonts and it suggests to add `<link rel=preload>`, but that doesn't make sense).

3.  Eliminate render-blocking resources (Probably could something with splitting, but had no time to fix that).

I'm pretty satisfied, because without that heroku thing I will have 100/100. Worked hard to get the PWA section 100/100 as well, but didn't figure out how to redirect HTTP traffic automatically to HTTPS. Tried in Node (`res.redirect`), tried with a `.htaccess`, but nothing worked. Doesn't really matter, so did not spend too much time on it.

### Webpagetest

Average first view was 1,132s and average repeat view was 0,261s. This is pretty good and you see the caching does it work.

![Webpage test](https://i.ibb.co/XXv4KnM/Screenshot-2021-03-28-at-21-41-02.png)

Two concrete tips:

1.  Use GZIP Compression

2.  Use a CDN

You can see the whole result [here](https://www.webpagetest.org/result/210328_XiWZ_ab2966bec92469aa5379dfada68a4f43/)

## :memo: Backlog

The backlog can be found in the [projects tab](https://github.com/jochemvogel/progressive-web-apps-2021/projects/1). The backlog is filled with issues. If you have any suggestions/feedback: add a new issue and please add the right label. Thanks in advance!

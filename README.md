# Progressive Web Apps @cmda-minor-web · 20-21

**[Live link](https://erlijn.herokuapp.com//)**

ERLIJN is a search engine for (cheap) flights where you can search and book flights.

### Table of Contents

<table>
    <tr>
        <td align="center"><a href="#nerd_face-usage">🤓 Usage<a></td>
        <td align="center"><a href="#gear-installation">⚙️ Installation<a></td>
        <td align="center"><a href="#open_file_folder-folder-structure">🗂 Folder Structure<a></td>
        <td align="center"><a href="#package-api-endpoints-structure">📦 API Structure<a></td>
        <td align="center"><a href="#memo-todo-list">📝 Todo list<a></td>
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

Copy the `.env.example` file, change the name to `.env` and update the value of the `API_KEY=` to the API key you got from RapidApi.

#### 4). Start development environment
`npm run dev` (Will build & watch automatically)

#### 5). Watch files (manual)
`npm run watch`

#### 6). Build files (manual)
`npm run build`

## :open_file_folder: Folder Structure

*Will be updated later:*
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
All the js, css and assets are located in this folder. When you build, those files will be optimized and placed in the `/public` folder.
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

## :memo: Todo list
-   [ ] **Error handling**. Worked in the WAFS version of this app, but it doesn't work here, yet.
-   [ ] **Improve the forms**. It's not really user friendly right now. The forms are getting cleared after submission, but you don't want this. Those forms needs to be filled with previous data.
-   [ ] **Come up with new ideas and add those in the backlog**. Ongoing 🙃

### Backlog

_Nice to have_-ideas. Won't add them in the todo list, because these are not todos, but just some ideas for improving the app. This list is chronologically ordered.

-   [ ] **Add a few sights that can be visited in the destination.** The unsplash API can be used for this.
-   [ ] **Let the user choose their currency**. It's standard EUR now, but why not make it dynamic.
-   [ ] **Let the user choose between only direct flights**. Maybe a checkbox and it can also be displayed on the details modal.
-   [ ] **Create loader and implement it on API calls.**
-   [ ] **Let users select their budget.**
-   [ ] **Autocomplete the location/airports.** This will improve the UX of the user and prevents the user from filling in the wrong location.
-   [ ] **Random city trip within the users' budget.** Just let them fill in a start point and generate a random city trip. Thinking about the details will come later.
-   [ ] **Think about the USP's.** Think about your users. Why would they choose for ERLIJN and not some other comparison app with more features. Deliver more than others do. What is the value proposition?

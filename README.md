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

Search for a location and click on search. Thereafter a few cards with quotes will appear. On this cards you can find a **`Details`** button. Click on this and a modal with details about the flight/quote will appear.

_Future: a **book** button on the details modal that will bring you to a checkout page/route._

### Screenshot

![Frontend ](https://github.com/jochemvogel/web-app-from-scratch-2021/blob/master/assets/img/screenshot_app.png)

<a href="installation"></a>

## :gear: Installation

### Get it local

This app is made with vanilla JS (frontend) and NodeJS (backend).
#### 1). Clone the repository
`git clone https://github.com/jochemvogel/progressive-web-apps-2021.git `

#### 2). Install dependencies & make the server run (nodemon)
`npm install && npm run start`

#### 3). Get an API key

Go to [RapidApi.com](https://rapidapi.com/skyscanner/api/skyscanner-flight-search) and click on **Sign Up** in the top right corner. When you've done this, return back to the previous URL and you can use the API. The API has no rate limit.

Copy the `.env.example` file, change the name to `.env` and update the value of the `API_KEY=` to the API key you got from RapidApi.

#### 4). Watch files
// CSS watcher

#### 5). Other  build scripts

_Will be updated when the whole NPM scripts is done_

## :open_file_folder: Folder Structure

This projects uses **modules**. Honestly I don't have to say a lot about it, so maybe in the future I'll add some more details about the usage of the project.

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

-   [x] **Add modules**. Make it more readable.

-   [x] **Let users fill in the location instead of the Airport Code**. More common that you search for `Amsterdam` instead of `AMS`. Make that happen.

-   [x] **Make the detail modal dynamic**. It's already dynamic now, but JS is creating a modal for every card, while one modal (that updates based on the data) is enough.

-   [x] **Let the user fill in the country instead of city**. Netherlands instead of AMS.

-   [x] **Error handling for users.** Give them feedback: are there no flights? Did they miss something? Did they fill in the wrong airport. Maybe the API-key is not working correctly (anymore), and they get an 401. Besides that: JS stops running when there is an error. When that happens, the app stops working (until you reload). Not a good UX imo.

-   [x] **Improve the details modal**. It's boring right now. Add extra (useful) information and redesign it.

-   [x] **Improve the checkout route**. It's boring right now. Add extra (useful) information and redesign it.

-   [ ] **Add template engine**. Never done it before, but sounds cool

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

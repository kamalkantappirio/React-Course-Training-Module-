# MHG Bluesky


## Setup

### Install Dependencies

`yarn install`

### Add Environment Variables

create a .env file in the root of the project and put the following in

```
DANGEROUSLY_DISABLE_HOST_CHECK=true
NEW_RELIC_LICENSE_KEY=ab6b7bfcd75ada2296ba426381c368648bf08a34
SFDC_LOGIN_URL=https://login.salesforce.com
API_ROOT=https://localhost:3000
CLIENT_ID=3MVG9y6x0357HlefiSswuWw415V.Oi7p2VIl.XHPY38QTVzT0mXKwX1gc2CdRroVtkEFTxjHyySuydbf_dwsj
CALLBACK_URL=http://localhost:3000/callback
SECRET=2030216597700637128
WEB_ROOT=http://localhost:3001
DATABASE_URL=postgres://<User>:<Password>@<Host>/<Database>
```

### Start Express Server

In a terminal window run `npm start` to initialize the node server

### Generate React App

In a seperate terminal window run `npm run build`. You can access the app locally at http://localhost:3001



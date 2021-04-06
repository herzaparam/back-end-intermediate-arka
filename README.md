# API Tickitz
### back-end-beginner-arka
an API ticketing movie which can book cinema seat by choosing the film, schedule, and the location which you preferred. 
Tickitz API, includes JWT, multer, and redis. registering login with otentication, authorization, and hashing password.

## Getting Started

### Prerequisites
[node.js](https://nodejs.org/en/download/), nodemon, morgan, cors, dotenv, express, mysql2, http-error, standadjs

### Installing
1. after installation setup, initialize your node
heres how to 
```
npm init
```

2. auto start server with nodemon
install :
```
npm install --save-dev nodemon
```

3. use morgan
```
var morgan = require('morgan')
```

4.use dot env
```
require('dotenv').config()
```

### Running the test
 after ran the server. try to get movies data 
*GET
```
http://localhost:8000/v1/movies/
```
*GET by title name
```
http://localhost:8000/v1/ticket/raya
```
parameter in url'raya' is needed to indentify data
*PUT
```
http://localhost:8000/v1/ticket/9
```
parameter in url'9' is to defined which data need to updated
*DELETE
```
http://localhost:8000/v1/ticket/9
```
parameter in url'9' is to defined which data need to deleted
### Author
* Herza Paramayudhanto
### Acknowlegment
*  [Risano Akbar](https://github.com/muhammadrisano)

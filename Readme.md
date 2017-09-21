#HiScore
Follow application is to make it simple to update the resumé and make it possible to se the faces who work on HiQ Ace. 

## Setup
To get started with this project you need to install some required tools.

1. Download and install Node.js to the latest version, if you not already have it.
[Node.js - for npm support](https://nodejs.org/en/)
2. Run follow to install all you need to get started with the project.
```
npm install -g @angular/cli typescript typings firebase-tools 
```
You can remove packages if it is some of them you already have installed.
Make sure you have the latest version. 

3. Make sure you have access to the [firebase console](https://console.firebase.com).

4. Run
``` 
npm install
```

## Commands

### Run the app
To run the application local. It's starts upp a temporary webserver on [http://localhost:4200](http://localhost:4200)
```
ng serve -o
```

### Publish the app
```
ng build --prod
```

### Update the documentation
This command updates the documentations 
```
npm run doc
```

# Arbitiary Environment Setup [V1.0.0]

## 1. **Create and configure Env Files**

In the root folder there are two environments already created, you can create multiple if you need to setup more environments. For the time being we have -

* .env.dev
* .env.prod

The `.env.dev` and `.env.prod` contains all the API url ID's (For the API only ID's gets changed as per environment). 

To add more you need to add more key and value in the relevant .env file. Please make sure that key name should always be started with `REACT_APP_` then key name and then call `process.env.REACT_APP_KEYNAME` anywhere in your app. 
**DO NOT USE KEYNAME WITHOUT STARTING WITH REACT_APP_ OTHERWISE IT WON'T WORK**

## 2. **Configure your config.js**

Now go to `src > configuration > config.js` and here you will see that ID's are replaced with the specific env variable, like `process.env.REACT_APP_LOGIN` 

If you want to add another url then -

* Please create a key in both of the env files
* Create a key inside the config.js export object
* Use the url in your application 

## 3. **Serving build on your local or over the internal networks**
To serve development or production version locally or on your internal network, please make sure to install `serve` package in your machine globally.
`npm i -g serve`

### To serve development version, Open terminal and write
```bash
npm run serve
```

### To serve production version in local machine or on your network, Open terminal and write
```bash
npm run serve:prod
```

* **Deployment**
### To deploy dev version, Open terminal and write
```bash
npm run deploy
```
This will deploy in https://dev.redbeltgym.com

### To deploy production version, Open terminal and write
```bash
npm run deploy:prod
```
This will deploy in https://redbeltgym.com

Happy Coding :slightly_smiling_face:

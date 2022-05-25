

$ git add .
warning: LF will be replaced by CRLF in package.json.
The file will have its original line endings in your working directory

solve : $ git config core.autocrlf true

<!-- heroku deploy steps -->

1. heroku login

2. heroku create project-name

3. heroku addons:create mongolab:sandbox  // removed from heroku

4. git add -A // add all changes

5. git commit -m "changes commit"

<!-- 8 vulnerabilities (6 moderate, 2 high) -->

$ npm audit fix --force


<!-- frontend libraries -->

    "axios": "^0.27.2",
    "bootstrap": "^5.1.3",
    "country-state-city": "^3.0.1",
    "overlay-navbar": "^1.2.3",
    "popper.js": "^1.16.1",
    "react": "^18.1.0",
    "react-alert": "^7.0.3",
    "react-alert-template-basic": "^1.0.2",
    "react-dom": "^18.1.0",
    "react-helmet": "^6.1.0",
    "react-icons": "^4.3.1",
    "react-js-pagination": "^3.0.3",
    "react-rating-stars-component": "^2.2.0",
    "react-redux": "^8.0.1",
    "react-router-dom": "^5.3.1",
    "react-scripts": "5.0.1",
    "redux": "^4.2.0",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^2.4.1",
    "web-vitals": "^2.1.4"
# Random Quiz Generator

## Installation
- Please git clone this repo `git@github.com:annpham11/Project-3.git` to your local machine

## Development
## Project setup
```
npm install
cd client
npm install
```
## Start server
```
npx nodemon
or npm start
```
## Run react app in dev mode
```
cd client
npm start
```
## Spin up dev mode for server and react app
This will serve react app from express but you have to refresh to see changes
```
npm run serve
```
## Deploying to Heroku
```
cd client
npm run build
cd ..
git add .
git commit -m "heroku build"
git push heroku BRANCH-NAME:main
heroku app: https://trivia-night01-app.herokuapp.com/ 


```
## Setting up SQL
1. Create a database called `trivia_project`
2. Create a table called `trivia`

## Setting up Reacter Router 
1. npm install react-router-dom@6 

## Approach Taken
- We approached this project, with the aim to create an application that gives the user the ability to login  and complete randomized quizzes consisting of 10 questions on different topics and categories
- We choose to use React rather than sticking to just Javascript, in order to enhance user experience and reduce the amount of DOM manipulation required to achieve the desired result. React allows for faster rendering times as the application only needs to reload components that have changed state.

## Digital Mockups
Mockup created with Figma
<a href="https://ibb.co/L820xtY"><img src="https://i.ibb.co/xDR21jX/Screen-Shot-2022-09-17-at-11-51-22-am.png" alt="Screen-Shot-2022-09-17-at-11-51-22-am" border="0" /></a> 


## Database Flowchart 
<a href="https://ibb.co/f4Pc90g"><img src="https://i.ibb.co/18wSM2g/Screen-Shot-2022-09-17-at-11-47-45-am.png" alt="Screen-Shot-2022-09-17-at-11-47-45-am" border="0"></a>



## Technologies Used
- Node js (libraries)
- Bcrypt
- Express-session
- React
- Bootstrap
- HTML
- CSS

## Unsolved Problems
- Sometimes when users login or signup their data is stored in the database, but sometimes Heroku crashes and prevents the application from authenticating the user, making the app nonfunctional.

## Potential Improvements
- Expand the amount of categories available to users
- Have customised messages for users when they get 80% or more on their quiz
- Allow users to share their score on social media
- Integrate a ranking system based on user scores
- Make the application available to members who don't have accounts or aren't willing to signup
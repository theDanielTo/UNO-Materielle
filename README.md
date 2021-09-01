# Mint-Bean-Hackathon (Aug 24, 2021 - Aug 31, 2021)
### UNO is back with a new look and feel! Delivering a responsive and an appealing aesthetic using React.js and Material UI, and with the addition of Socket.io, you can play with other players online!

Collab project with
* [Brian Bozigian](https://github.com/BrianBozi)
* [Michael Aguilar](https://github.com/Michael-M-Aguilar)
* [Daniel To](https://github.com/theDanielTo)

## Live Demo

Try the application live at [https://mintbean-uno.herokuapp.com/](https://mintbean-uno.herokuapp.com/)

## Technologies Used

- React.js
- Node.js
- Express.js
- PostgreSQL
- Socket.io
- React Router
- Material UI
- uuid
- Babel
- Webpack
- pg (PostgreSQL client for Node.js)
- Javascript ES6

## Features

- Users can create a new Uno game lobby.
- Users can join any lobby on the 'Find a Game' page.
- Users can play against another player. The first player to play all of their cards win!

## Preview
![Kapture 2021-08-31 at 18 12 08](https://user-images.githubusercontent.com/70422100/131596045-83e76359-2c45-4503-be6e-7df1329a92ba.gif)


## Development

### System Requirements

- VS Code or any similar IDE supporting JavaScript ES6
- Node.js 14 or higher
- NPM 7 or higher
- PostgreSQL 12 or higher

### Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:theDanielTo/Mint-Bean-Hackathon.git
    cd mint-bean-hackathon
    ```
    
2. Install all dependencies with NPM.

    ```shell
    npm install
    ```
    
3. Import the example database to PostreSQL.

    ```shell
    npm run db:import
    ```

4. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```


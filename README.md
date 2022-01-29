# Launch with Docker

1.  Make sure **`docker`**, **`docker-compose`** and **`npm`** are installed and available from the terminal.

2.  Check the `.env` file. If **`DB_HOST=localhost`** string is in file, then remove it.

3.  Launch the app

         docker-compose up (npm run docker)

# Launch without Docker

1.  Make sure **`npm`** and **`node`** are installed and available from the terminal;

2.  Install dependencies

        npm i

3.  Check the `.env` file. If **`DB_HOST=localhost`** string isn't in file, then add it.
4.  Launch the app

        npm start

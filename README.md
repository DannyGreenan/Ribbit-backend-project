# News API Backend

## Project Summary

This project is a backend API designed to supply news data to a front-end client. It is built using Express.js and integrates with a PostgreSQL database hosted on Supabase, utilizing the node-postgres library for database interactions. The application is configured to operate in multiple environments, such as development and testing, and includes scripts for setting up and seeding the local database.

The /api endpoint serves as the API documentation, providing a comprehensive overview of all available endpoints.

## Setup Project

### How to clone

    git clone https://github.com/DannyGreenan/backend-project.git

### Install Dependencies

run npm install to install all libaries listed in the package.JSON

    npm install

### Create environment variables

When cloning this project you will need to create two .env files for your project: .env.test and .env.development. Into env.development add PGDATABASE=nc_news, into env.test add PGDATABASE=nc_news_test

    // env.development
    PGDATABASE=nc_news

    // env.test
    PGDATABASE=nc_news_test

### Seed local database

to set up the database run 'npm run setup-dbs' and 'npm run seed'

    npm run setup-dbs
    npm run seed

### How to Run Tests

To run tests, use the following command:

    npm test

### minimum versions

- **Node.js**: Minimum version `22.4.1`
- **psql (PostgreSQL)**: Minimum version `16.4`

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

o>>> DigiWorld

# DigiWorld Documentation
  Description
  DigiWorldd is an API for managing a collection of Digimon, allowing players to buy, sell, and view details about their Digimon.This documentation provides details on the available endpoints and how to use them.

# Getting Started
  To get started with the DigiWorld, follow these steps:

# Clone the repository.
  Install dependencies using npm install.
  Set up the database by running migrations with npm run migrate.
  Start the server with npm start.
 
o> Explore the API endpoints detailed below.
#   Athlete Endpoint
      Get Athlete Profile Get the profile information of the authenticated athlete.
      URL: /athlete/profile Method: GET Headers: Authorization: Bearer token Success Response: Code: 200 Content:

    {
      "id": "tes2",
      "username": "tesss",
      "email": "tess2te@main.com",
      "amount": 200000
    }
# Error Response: Code: 401 Unauthorized Content:

    {
      "error": "Unauthorized",
      "message": "Invalid or missing authentication token"
    }

# Code: 500 Internal Server Error Content:

    {
      "error": "Internal Server Error",
      "message": "An unexpected error occurred while processing the request"
    }
# Digimon Endpoint


# Order Endpoint
...

# Additional Notes
# Authenticate
...

# Search
...

# Sort
...

# Pagination
...

# Error Handler
...

# Dependencies
The project uses the following dependencies:

o> Express
o> Sequelize
o> Bcrypt
o> Jsonwebtoken
o> Supertest(for testing)
  - Axios(for Digi API integration)
o> Install them using npm install.

 # External APIs
o>  Digi API
  The Digi API is used to fetch details about Digimon, including names, images, stats, and more.Visit the Digi API documentation for more information.

o>  Midtrans
  Midtrans is integrated to handle payment transactions for athlete amount top - up.Visit the Midtrans documentation for more information on integrating Midtrans into your application.

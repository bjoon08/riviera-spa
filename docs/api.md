# API Endpoints

## Testing

- **URL**: `http://localhost:5001`

- **Path**: `/`

- **Methods**: `GET`

    - **GET** - returns a response `"Welcome to Riviera Spa API"`

- **Path**: `/test`

- **Method**: `POST`

    - **POST** - sends a test request to see if the server is connected and running

## Users

- **Path**: `/signup`

- **Method**: `POST`

    - **POST** - handles user sign up request, creates a new user if the username is not already taken

- **Path**: `/users`

- **Method**: `GET`

    - **GET** - retrieves a list of all users

- **Path**: `/roles`

- **Method**: `GET`

    - **GET** - retrieves a list of all roles

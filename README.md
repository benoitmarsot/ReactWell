# React Well

![img1](https://raw.githubusercontent.com/benoitmarsot/ReactWell/main/src/main/resources/static/readme.png)

This is a full-stack application that uses ReactJS as frontend and Java with Springboot as backend. The application uses Tomcat as a web server and PostgreSql as a database. The backend server uses Spring Web MVC for REST APIs.

## Description

The application is designed for massage therapists and other alternative health professionals to create EHRs that have history and can track clients' progress. The system can register providers. The provider can register patients. Patients receive an invitation from the provider via email or SMS. The client can review the health procedure and records and view the progress over time. The provider can easily indicate only what has changed in the client's health. The application can pinpoint the source of pain using the body tracker.

## Installation

1. Clone this repository
2. Install [Java](https://www.java.com/en/download/) and [PostgreSQL](https://www.postgresql.org/download/)
3. Install [Node.js](https://nodejs.org/en/download/)
4. Run `npm install` in the root directory
5. Run `npm start` to start the frontend server
6. Run `./mvnw spring-boot:run` to start the backend server

## Usage

1. Open your browser and go to `http://localhost:8080`
2. Register as a provider or patient
3. Log in with your credentials
4. Create a new patient record or update an existing one
5. Use the body tracker to pinpoint pain sources

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)


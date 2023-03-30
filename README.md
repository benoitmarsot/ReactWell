# React Well

![img1](https://raw.githubusercontent.com/benoitmarsot/ReactWell/main/src/main/resources/static/readme.png

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

# Ball
## Author: Benoit Marsot
![img1](https://raw.githubusercontent.com/benoitmarsot/Ball/master/Img/Main.png)
Ball is a #MRTK #Hololens2 ball application, the player push the ball and can control multiple parameters. also the ball can be control using a controller.

## Features:

 - Menu 
    - Gravity Slider 
    - Bounciness Slider 
    - Size Slider
    - Bring Ball
 - Game pad can be use to control the ball
 - The ball is deformed on collision
	 - The Cube sphere and deformation  by Jasper Flick from:
		 - https://catlikecoding.com/unity/tutorials/mesh-deformation/
- The collision with the hand is done through "HandSmashService" created by Joost van Schaik:
	- https://localjoost.github.io/HandSmashService-an-MRTK2-extension-service-to-smash-holograms-at-high-speed/

## Gameplay

 ![Image 1](https://raw.githubusercontent.com/benoitmarsot/Ball/master/Img/20210401_001624_HoloLens.jpg)

 
![Image 2](https://raw.githubusercontent.com/benoitmarsot/Ball/master/Img/20210403_010428_HoloLens.jpg)
![Image 3](https://raw.githubusercontent.com/benoitmarsot/Ball/master/Img/20210403_010500_HoloLens.jpg)
![Image 4](https://raw.githubusercontent.com/benoitmarsot/Ball/master/Img/20210403_010508_HoloLens.jpg)
![Image 5](https://raw.githubusercontent.com/benoitmarsot/Ball/master/Img/20210403_122232_HoloLens.jpg)
![Image 6](https://raw.githubusercontent.com/benoitmarsot/Ball/master/Img/20210403_122235_HoloLens.jpg)
![Image 7](https://raw.githubusercontent.com/benoitmarsot/Ball/master/Img/20210403_122244_HoloLens.jpg)

## To do
- Top menu icons doesn't work
- Use a better bounce sound
- Vertical joystick connection
- More sliders parameterization
- Make the new HandSmashService trigger the ball deformation.

## Done
- Fix buttons only tether click is working 
- Adjust the force when pushing the ball.


Sure! Here’s a sample README.md file that describes a full-stack application using ReactJS, Java, Springboot, Tomcat, PostgreSql:

Full Stack Application
This is a full-stack application that uses ReactJS as frontend and Java with Springboot as backend. The application uses Tomcat as a web server and PostgreSql as a database.

Description
The application is designed for massage therapists and other alternative health professionals to create EHRs that have history and can track clients’ progress. The system can register providers. The provider can register patients. Patients receive an invitation from the provider. The client can review the health procedure and records and view the progress over time. The provider can easily indicate only what has changed in the client’s health. The application can pinpoint the source of pain using the body tracker.

Installation
Clone this repository
Install Java and PostgreSQL
Install Node.js
Run npm install in the root directory
Run npm start to start the frontend server
Run ./mvnw spring-boot:run to start the backend server
Usage
Open your browser and go to http://localhost:3000
Register as a provider or patient
Log in with your credentials
Create a new patient record or update an existing one
Use the body tracker to pinpoint pain sources
Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

License
MIT

I hope this helps!
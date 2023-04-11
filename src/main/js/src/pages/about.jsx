import React from 'react';

class About extends React.Component {
  MySubComponent(props) {
    return <p>{props.text}</p>;
  }

  render() {
    return (
        <div>
            <h1>About Reactwell</h1>
            <p>
                Reactwell is a new full-stack application created by Benoit Marsot that allows alternative health practitioners to create EHRs associated with a 2D model of the patient‘s body so that all assessments are related to a specific part of the body. Reactwell also keeps track of assessment changes over time and allows for providers and patients to easily progress over time.
            </p><p>
                Reactwell was built with the altruistic goal of helping an underserved industry group. Being an alternative care professional is more of a vocation and most practitioners are not making a ton of money. For that reason, Reactwell is free for as long as possible. If you have an extra dollar, you can send it my way!-)
            </p><p>
                Reactwell has several features such as securely auto-registering new caregivers and patients, enlisting patients, allowing patient login to see the EHR and notes from the caregiver, allowing caregivers to create EHR assessments; each note can be associated with a precise body position using a 2D model, keeping track of assessment history over time; it allows patients and caregivers to see progress over time and printing present and past assessments.
            </p><p>
                Reactwell is a full-stack application created entirely by Benoit Marsot while he was trying to find a full-stack position using Java, Spring Boot, Spring Security, ReactJS, and PostgreSQL. It was built to showcase his ability to create a full-stack application with current technologies.
            </p><p>
                The front-end of the application is built using React which allows for the creation of highly interactive and responsive user interfaces. The back-end of the application is built using PostgreSQL, a powerful and scalable open-source database management system. The application is built using the Spring Boot framework which allows for rapid development and easy deployment. Spring Security is used to add security features to the application such as user authentication and authorization. The demo application showcases the combined capabilities of these technologies showcasing their strengths in terms of security, scalability, and user experience.
            </p><p>
                Overall, React Well is a powerful and effective demonstration of the capabilities of React, Spring Security, PostgreSQL, and the Spring Boot framework. It provides a simple and user-friendly interface for interacting with a database while also providing robust security features to protect sensitive data.
            </p>
        </div>
    );
  }
}
export default About;



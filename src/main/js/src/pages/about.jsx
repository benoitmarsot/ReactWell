import React from 'react';

class About extends React.Component {
  MySubComponent(props) {
    return <p>{props.text}</p>;
  }

  render() {
//        Reactwell the new Unbumpkin EHR for alternative health practionner. It allowed to create EHR that are assoiciated to a 2d model of the patients so all assessment are related to a specific part of the body.  Also react well keep track of the assessment change over time and allow for the provider and the patient to easily progress over time.
//
//        At Unbumpkin we understand that being a alternative care professionnal is more of a vocation and that most of you are not making a ton of money, for that reasons at unbumpkin we will try to keep it free for the longuest time possible.  If you have a $ too much send it my way, I need-it.  
//
//        With Reactwell you can:
//        - Secure autoregister of new caregiver
//        - Secure autoregister of new patient
//        - enlist patients
//        - allow patient login to see the  ehr and notes from the crae giver
//        - allow caregiver to create EHR assessment, each note can be associated to a precise body position using a 2d model
//        - wellreact keeps the historic of the assessment overtime it allow the patient and caregiver to see progress overtime
//        - reactwell can print the present and past assessment 
//
//        Reactwell is a fullstack application, created entierly by Benoit Marsot while he is trying to find a full stack position using:
//        - Java
//        - Spring boot
//        - Spring security
//        - ReactJS
//        - PostgreSql
//        It was built to showoff my ability to create a fullstak application with the current technologies
    return (
        <div>
            <h1>About Reactwell</h1>
            <p>
                Reactwell is a new full-stack application created by Benoit Marsot that 
                allows alternative health practitioners to create EHRs associated with 
                a 2D model of the patient&lsquo;s body so that all assessments are related 
                to a specific part of the body. Reactwell also keeps track of assessment
                changes over time and allows for providers and patients to easily 
                progress over time.
            </p>
            <p>
                At Unbumpkin, we understand that being an alternative care professional 
                is more of a vocation and that most of you are not making a ton of money.
                For that reason, at Unbumpkin, we will try to keep Reactwell free for as 
                long as possible. If you have an extra dollar, send it our way! 😊
            </p>
            <h2>Features</h2>
            <ul>
              <li>Securely auto-register new caregivers and patients</li>
              <li>Enlist patients</li>
              <li>Allow patient login to see the EHR and notes from the caregiver</li>
              <li>Allow caregivers to create EHR assessments; each note can be associated with a precise body position using a 2D model</li>
              <li>Keep track of assessment history over time; it allows patients and caregivers to see progress over time</li>
              <li>Print present and past assessments</li>
            </ul>
            <h2>About the Creator</h2>
            <p>
                Reactwell is a full-stack application created entirely by Benoit Marsot
                while he was trying to find a full-stack position using Java, Spring Boot, 
                Spring Security, ReactJS, and PostgreSQL. It was built to showcase 
                his ability to create a full-stack application with current technologies.
            </p>    
        </div>
    );
  }
}
export default About;



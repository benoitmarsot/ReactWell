import React from 'react';

class About extends React.Component {
  MySubComponent(props) {
    return <p>{props.text}</p>;
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <this.MySubComponent text="This is a subcomponent." />
      </div>
    );
  }
}
export default About;



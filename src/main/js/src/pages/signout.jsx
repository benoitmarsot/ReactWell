
const SignOut = (props) => {
    const onSignOut=props.onSignOut;
    onSignOut();
    return (
        <div>
            <h1>Sign Out</h1>
            <p>Thank you for using this application.</p>
        </div>
    );
};

export default SignOut;

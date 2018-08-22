import React from 'react';

class  Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  // onNameChange = (event) => {
  //   this.setState({name: event.target.value})
  // }

  // onPasswordChange = (event) {
  //   this.setState({password: event.target.value})
  // }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
          <main className="pa4 black-80">
            <form className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    autoComplete="name"
                    id="name"
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    autoComplete="email"
                    id="email-address"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    id="password"
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={() => onRouteChange('home')}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
              </div>
            </form>
          </main>
        </article>
      </div>
    );
  }
};

export default Register;
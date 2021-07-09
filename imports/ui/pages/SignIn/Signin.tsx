// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import SimpleForm from "/imports/ui/components/SimpleForm/SimpleForm";
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';

import { signinStyle } from "./SigninStyle";



export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferer: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // Using a ref is accessing the DOM directly and not preferred
  // The React way to get the value from an input is using onChange
  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit(doc) {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.props.showSnackBar({
          type:'error',
          title:'Acesso negado!',
          description: err.reason === 'Incorrect password' ? 'Email ou senha inválidos' : err.reason === 'User not found' ? 'Este email não está cadastrado em nossa base de dados.' : '',
        });
      } else {
        this.props.showSnackBar({
          type:'sucess',
          title:'Acesso autorizado!',
          description: 'Login de usuário realizado em nossa base de dados!',
        });
        this.setState({
          redirectToReferer: true,
        })
      }
    })
  }


  render() {
    const self = this;
    const { user, location } = this.props;
    const { redirectToReferer, error } = this.state;
    const { from } = location.state || { from: { pathname: '/' } }
    
    // if correct authentication, redirect to page instead of login screen
    if (redirectToReferer) {
      if(from && from.pathname === '/signout') {
        from.pathname = '/';
      } else {
        from.pathname = '/toDoList';
      }

      return <Redirect to={ from } />
    }

    if(!!user && !!user._id) {
      this.setState({ redirectToReferer: true })
      this.props.history.push('/toDoList');
    }


    return (
      <Container style={ signinStyle.containerSignIn }>
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
          <div>
            <h2 style={ signinStyle.labelAccessSystem }>
              { 'Acessar o sistema' }
            </h2>

            <SimpleForm
              schema={{
                email:{ type:'String', label:'Email', optional:false },
                password:{ type:'String', label:'Senha', optional:false },
              }}

              onSubmit={ this.handleSubmit }
            >
              <div stacked>
                <TextField
                  label="Email"
                  fullWidth={ true }
                  name="email"
                  type="email"
                  placeholder="Digite seu email"
                />

                <TextField
                  label="Senha"
                  fullWidth={ true }
                  name="password"
                  placeholder="Digite sua senha"
                  type="password"
                />

                <div style={ signinStyle.containerButtonOptions }>
                  <Button id='forgotPassword' color={ 'secondary' } onClick={ () => this.props.history.push('/recovery-password') }>{ "Esqueci a minha senha" }</Button>
                  <Button id="btnEnter" variant={ 'outlined' } color={ 'primary' } submit> { "Entrar" }</Button>
                </div>
              </div>
            </SimpleForm>

           
          </div>
        </div>
      </Container>
    )
  }
}

Signin.propTypes = { location: PropTypes.object.isRequired }
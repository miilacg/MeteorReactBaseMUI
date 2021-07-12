// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { userprofileApi } from "../../../userprofile/api/UserProfileApi";

import SimpleForm from "/imports/ui/components/SimpleForm/SimpleForm";
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';

import { signupStyle } from "./SignupStyle";



export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', error: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // Using a ref is accessing the DOM directly and not preferred
  // The React way to get the value from an input is using onChange
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit() {
    const { email, password } = this.state;

    userprofileApi.insertNewUser({ username: email, email, password }, (err, r) => {
      if (err) {
        this.props.showSnackBar({
          type:'error',
          title:'Problema na criação do usuário!',
          description: err.reason,
        });
      } else {
        this.props.showSnackBar({
          type:'sucess',
          title:'Cadastrado com sucesso!',
          description: 'Registro de usuário realizado em nossa base de dados!',
        });
      }
    })
  }

  render() {
    const { error } = this.state;


    return (
      <Container style={ signupStyle.containerSignUp }>
        <h2 style={ signupStyle.labelRegisterSystem }>
          { 'Cadastrar no sistema' }
        </h2>

        <SimpleForm 
          onSubmit={ this.handleSubmit }
          schema={ userprofileApi.schema }
        >
          <TextField
            id="Email" 
            label="Email"
            fullWidth
            name="email"
            type="email"
            placeholder="Digite um email"
            onChange={ this.handleChange }            
          />
          
          <TextField
            id="Senha"
            label="Senha"
            fullWidth
            name="password"
            placeholder="Digite uma senha"
            type="password"
            onChange={ this.handleChange }
          />

          <div style={ signupStyle.containerButtonOptions }>
            <Button color={ 'primary' } variant={ 'outlined' } submit> { 'Cadastrar' } </Button>
          </div>
        </SimpleForm>

        <div style={ signupStyle.containerRouterSignIn }>
          Já tem uma conta? Faça login clicando <Link to="/signin" color={ 'secondary' }>aqui</Link>
        </div>
      </Container>
    )
  }
}
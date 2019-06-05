import React from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/form.js';
import { update, generateData, isFormValid } from '../utils/formlogic.js';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/user_actions.js';

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        formError: false,
        formSuccess: false,
        showForm: false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Nombre'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            lastname: {
                element: 'input',
                value: '',
                config:{
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Apellido'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Dirección de email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Contraseña'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config:{
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirmar contraseña'
                },
                validation:{
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
        }
    }
      this.handleInput = this.handleInput.bind(this);
      this.postData = this.postData.bind(this);
      this.openForm = this.openForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    openForm() { this.setState ({ showForm: !this.state.showForm }) };
    
    handleInput(element) {
      const newFormdata = update(element, this.state.formdata, 'register');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    postData (url= '', data= {}) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {console.log(response) })
      .catch(err => console.error(err));
    }

    handleSubmit(e) {
      e.preventDefault();
      let dataToSubmit = generateData(this.state.formdata, 'register');
      let formIsValid = isFormValid(this.state.formdata, 'register')
      if (formIsValid) {
        this.props.dispatch(registerUser(dataToSubmit)).then(response => {
          if (response.payload.success) {
            this.setState({
              formError: false,
              formSuccess: true,
              showForm: !showForm,
            });            
          this.props.history.push('/login')
          } else {
            this.setState ({
              formError: true
            })
          }
        })
      } else {
        this.setState ({
          formError: true
        })        
      }
    };

    render () {
        return (
        <span>   
          <button className="open-button" onClick={this.openForm}>Crea Una Cuenta</button>
          <div className="form-popup" id="myForm" style={{display: this.state.showForm ? 'inline' : 'none' }}>
          <form className="form-container" onSubmit={(e)=>  this.handleSubmit(e)}>
          <h1 >Crear Una Cuenta</h1>
            <label><b>Nombre</b></label>
            <FormField
              id={'name'}
              formdata={this.state.formdata.name}
              change={(element)=> this.handleInput(element)}
            />
            <label><b>Apellido</b></label>
            <FormField
              id={'lastname'}
              formdata={this.state.formdata.lastname}
              change={(element)=> this.handleInput(element)}
            />
            <label><b>Email</b></label>
            <FormField
              id={'email'}
              formdata={this.state.formdata.email}
              change={(element)=> this.handleInput(element)}
            />
            <label><b>Contraseña</b></label>
            <FormField
              id={'password'}
              formdata={this.state.formdata.password}
              change={(element)=> this.handleInput(element)}
            />
             <label><b>Confirmar Contraseña</b></label>
            <FormField
              id={'confirmPassword'}
              formdata={this.state.formdata.confirmPassword}
              change={(element)=> this.handleInput(element)}
            />
             {this.state.formError ? 
                  <div className= "error">
                    Favor de revisar sus datos.
                  </div>
                  : null
                }
            <button className="fancyButton"  type="submit" onClick={this.handleSubmit}>Crear Cuenta</button>
          <button  className="fancyButton"  type="button" onClick={this.openForm}>Cerrar</button>
        </form>
        </div>
        </span>
        )
    }
}

export default connect()(withRouter(Register));
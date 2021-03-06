import React from 'react';
import Login from '../Login.jsx';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Register from '../Register.jsx';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/user_actions.js';
import { Link, withRouter} from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        linkClicked: false,
        links:[
            {
                name:'Volver a Inicio',
                linkTo:'/',
                public: true
            },
            {
                name:'Productos',
                linkTo:'/Products',
                public: true
            },
            {
                name:'Carrito de Compras',
                linkTo:'/Cart',
                public: false
            },
            {
                name:'Mi Cuenta',
                linkTo:'/UserDashboard',
                public: false
            },
            {
                name:'Cómo comprar',
                linkTo:'/HowTo',
                public: true
            },
            {
                name:'Nuestra Garantía de Entrega',
                linkTo:'/OurGuarantee',
                public: false
            },
        ]
    }
    this.logoutHandler = this.logoutHandler.bind(this);
    this.defaultLink = this.defaultLink.bind(this);
    this.showLinks = this.showLinks.bind(this);
    this.renderLoginLogout = this.renderLoginLogout.bind(this);
  }
  
  handleClick () {
    this.setState ({ linkClicked: !this.state.linkClicked })
  }

  logoutHandler () {
    this.props.dispatch(logoutUser()).then(response =>{        
        if(response.payload.success){
            this.props.history.push('/')
        }
    })
  }


    defaultLink (item,i) { return (
        <Link to={item.linkTo} key={i}>
            {item.name}
        </Link>
    )
    };

    showLinks () {
        let list = [];

        if(this.props.user.userData){
            this.state.links.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public){
                        list.push(item)
                    }
                } else{
                        list.push(item)
                    }
            });
        }

        return list.map((item,i)=>{
                return this.defaultLink(item,i)
        })
    };

    renderLoginLogout () { 
        if (this.props.user.userData) {
            if (this.props.user.userData.isAuth) {
                return(
                    <span className="headerSections2 loginRegister">
                        <div>
                        <button className="dropbtn" onClick={()=> this.logoutHandler()}> Cerrar Session </button>
                        </div>
                        <span className="headerSections2" >
                        <div>
                        <span style={{color:"#b46875", marginRight:"6px"}}>{this.props.user.userData.cart ? this.props.user.userData.cart.reduce((a,e)=>a+e.quantity, 0):0}</span>
                        <Link className="link" to='/Cart'>
                        Carrito de Compras
                        </Link>
                        </div>
                        </span>
                    </span>
                )
            } else {
                return(
                    <span className="headerSections2 loginRegister" >
                    <div>
                    <Login />
                    </div>
                    <div>
                    <Register />
                    </div>
                </span> 
                )
            }
        }
    }

    
    render() {
        return (
            <div>
            <header className='PageTitle'>
                  <span className="dropdown headerSections">
                    <button className="dropbtn"><FontAwesomeIcon icon={faBars} className="icon" /></button>
                        <span className="dropdown-content">
                            {this.showLinks(this.state.links)} 
                        </span>
                  </span>
                 <span className="headerSections TitleName">
                <a href="/"> Narzisse</a>
                 </span>
                    <span>
                         { this.renderLoginLogout() }   
                    </span>
                    <div></div>
                    <div className="PageTitle promo">Envíos Gratis en Compras Mayores de $200</div>
                    </header>
                         </div>
        );
    }
}


function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));


//kualneskayotl:
// ki’ichpanil
// Guendasicarú
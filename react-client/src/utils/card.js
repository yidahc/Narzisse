import React from 'react';
import Ybutton from './button.js';

import { connect } from 'react-redux';
import { addToCart } from '../actions/user_actions.js';

const cardImages = [
    '/images/product1.jpg', '/images/product2.jpg', '/images/product3.jpg', '/images/product4.jpg'
 ];

class Card extends React.Component {

    renderCardImage(images){
        if(images.length > 0){
            return images[0]
        } else {
            return '/images/product1.jpg'
        }
    }


    render() {
        const props = this.props;
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div
                    className="image"
                    style={{
                        background:`url(${this.renderCardImage(cardImages)} no-repeat`}}>  
                    </div>
                    <div className="action_container">
                        <div className="tags">
                            <div className="brand">{props.brand.name}</div>
                            <div className="name">{props.name}</div>
                            <div className="name">${props.price}</div>
                        </div>
                    
                    { props.grid ?
                        <div className="description">
                            <p>
                                {props.description}
                            </p>    
                        </div>
                        :null
                    }
                    <div className="actions">
                        <div className="button_wrapp">
                            <Ybutton
                                type="default"
                                altClass="card_link"
                                title="Ver producto"
                                linkTo={`/product_detail/${props._id}`}
                                addStyles={{
                                    margin: '10px 0 0 0'
                                }}
                            />
                        </div>
                        <div className="button_wrapp">
                            <Ybutton
                                type="bag_link"
                                runAction={()=>{
                                    props.user.userData.isAuth ?
                                        this.props.dispatch(addToCart(props._id))
                                    :
                                        console.log('you need to log in')
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);
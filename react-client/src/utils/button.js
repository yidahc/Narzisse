import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';


const Ybutton = (props) => {
    const buttons = () =>{
        let template = '';
        switch(props.type){
            case "default":
                template = <Link
                    className="link_default"
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    {props.title}
                </Link>
            break;
            case "bag_link":
            template = 
                <div className="bag_link"
                    onClick={()=>{
                        props.runAction();
                    }}
                >
                    <FontAwesomeIcon
                        icon={faShoppingBag}
                    />
                </div>
        break;
            default: 
                template = ''; 
        }
        return template
    }

    return (
        <div className="my_link">
            {buttons()}
        </div>
    );
};

export default Ybutton;
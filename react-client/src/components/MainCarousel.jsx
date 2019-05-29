import React from 'react';
import Carousel, { Dots }  from '@brainhubeu/react-carousel';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import '@brainhubeu/react-carousel/lib/style.css';

let Image1 = './images/slide1.jpg';
let Image2 = './images/slide2.jpg';
let Image3 = './images/slide3.jpg';
let Image4 = './images/slide4.jpg';
let Image5 = './images/slide5.jpg';
let Image6 = './images/slide6.jpg';
let Image7 = './images/slide7.jpg';
let Image8 = './images/slide8.jpg';
let Image9 = './images/slide9.jpg';

class MainCarousel extends React.Component {
    constructor() {
      super()
      this.state = { value: 0 };
      this.onChange = this.onChange.bind(this);
    }
  
    onChange(value) {
      this.setState({ value });
    }
    render() {
        return (
  <div>
    <Carousel 
     value={this.state.value}
     onChange={this.onChange}
     slides={[
       (<img src={Image1} />),
       (<img src={Image2} />),
       (<img src={Image3} />),
     ]}
     arrowLeft={<FontAwesomeIcon icon={faClock} className="icon-example" name="arrow-left" />}
     arrowRight={<FontAwesomeIcon icon={faClock} className="icon-example" name="arrow-right" />}
     addArrowClickHandler
     clickToChange
     centered
     autoPlay={2000}
     animationSpeed={1000}  
     infinite
    />
    <Dots Dots value={this.state.value} onChange={this.onChange} number={3} />
  </div>
    );
    }
}

export default MainCarousel;

// slidesPerPage={2}
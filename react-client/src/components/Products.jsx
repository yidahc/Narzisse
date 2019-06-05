import React from 'react';
import ProductCards from '../utils/ProductCards.jsx';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [
      {
        id: 1,
        name: 'Eli',
        description: 'Really pretty girl',
        price: 50000,
        images: ['./images/slide7.jpg'],
      },
      {
        id: 2,
        name: 'Long Wig',
        description: 'Long wig for girl',
        price: 350,
        images: ['./images/slide6.jpg'],
      },     
    ]
  }
}


  render () {
    return (  
      <span>
        <ProductCards list={this.state.data}/>
      </span>
    )
  }
}
export default Products;

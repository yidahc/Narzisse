import React from 'react';
import { connect } from 'react-redux';

import LoadmoreCards from  '../utils/loadmorecards.js';
import PageTop from  '../utils/pagetop.js';
import CollapseRadio from  '../utils/collapseRadio.js';
import CollapseCheckbox from  '../utils/collapseCheckbox.js';


import { getProductsToShop, getBrands, getCategories } from '../actions/product_actions.js'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';


const price = [
  {
      "_id":0,
      "name":"Any",
      "array":[]
  },
  {
      "_id":1,
      "name":"$0 to $299",
      "array":[0,299]
  },
  {
      "_id":2,
      "name":"$300 to $599",
      "array":[300,599]
  },
  {
      "_id":3,
      "name":"$600 to $999",
      "array":[600,999]
  },
  {
      "_id":4,
      "name":"$1000 to $1999",
      "array":[1000,1999]
  },
  {
      "_id":5,
      "name":"More than $2000",
      "array":[2000,1500000]
  }
]


class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      grid:'',
      limit:6,
      skip:0,
      filters:{
          brand:[],
          category:[],
          price:[]
      }
    }
    this.handlePrice = this.handlePrice.bind(this);
    this.handleFilters = this.handleFilters.bind(this);
    this.showFilteredResults = this.showFilteredResults.bind(this);
    this.loadMoreCards = this.loadMoreCards.bind(this);
    this.handleGrid = this.handleGrid.bind(this);
  }

    componentDidMount(){
      this.props.dispatch(getBrands());
      this.props.dispatch(getCategories());

      this.props.dispatch(getProductsToShop(
         this.state.skip,
         this.state.limit,
         this.state.filters
     ))
  };

  handlePrice (value) {
    const data = price;
    let array = [];

    for(let key in data){
        if(data[key]._id === parseInt(value,10)){
            array = data[key].array
        }
    }
    return array;
}

handleFilters (filters,category) {
  const newFilters = this.state.filters
  newFilters[category] = filters;

   if(category === "price"){
       let priceValues = this.handlePrice(filters);
       newFilters[category] = priceValues
   }

  this.showFilteredResults(newFilters)
  this.setState({
      filters: newFilters
  })
}

showFilteredResults (filters) {
   this.props.dispatch(getProductsToShop(
       0,
       this.state.limit,
       filters
   )).then(()=>{
       this.setState({
           skip:0
       })
   })
}

loadMoreCards () { 
  let skip = this.state.skip + this.state.limit;

  this.props.dispatch(getProductsToShop(
      skip,
      this.state.limit,
      this.state.filters,
      this.props.products.toShop
  )).then(()=>{
      this.setState({
          skip
      })
  })
}

handleGrid () {
  this.setState({
      grid: !this.state.grid ? 'grid_bars':''
  })
}

  render () {
    return (  
      <div>
      <PageTop
          title="Productos"
      />
      <div className="container">
          <div className="shop_wrapper">
              <div className="left">
                
                 
              </div>
              <div className="right">
                  <div className="shop_options">
                      <div className="shop_grids clear">
                          <div
                              className={`grid_btn ${this.state.grid?'':'active'}`}
                              onClick={()=> this.handleGrid()}
                          >
                              <FontAwesomeIcon icon={faTh}/>
                          </div>
                          <div
                              className={`grid_btn ${!this.state.grid?'':'active'}`}
                              onClick={()=> this.handleGrid()}
                          >
                              <FontAwesomeIcon icon={faBars}/>
                          </div>
                      </div>
                  </div>
                  <div style={{clear:'both'}}>
                     

                  </div>
              </div>
          </div>
      </div>
  </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      products: state.products
  }
}

export default connect(mapStateToProps)(Products);


/*
  <CollapseCheckbox
                      initState={true}
                      title="Marcas"
                      list={this.props.products.brands}
                      handleFilters={(filters)=> this.handleFilters(filters,'brand')}
                  />
                  <CollapseCheckbox
                      initState={false}
                      title="Categorias"
                      list={this.props.products.categories}
                      handleFilters={(filters)=> this.handleFilters(filters,'category')}
                  />
                   <CollapseRadio
                      initState={true}
                      title="Precio"
                      list={price}
                      handleFilters={(filters)=> this.handleFilters(filters,'price')}
                  />
*/

/*
 <LoadmoreCards
                          grid={this.state.grid}
                          limit={this.state.limit}
                          size={this.props.products.toShopSize}
                          products={this.props.products.toShop}
                          loadMore={()=> this.loadMoreCards()}
                      />
*/
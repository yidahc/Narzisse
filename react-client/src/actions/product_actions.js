import axios from 'axios';

export function getProductsBySales(){
    //?sortBy=sold&order=desc&limit=100
    const request = axios.get('/api/product/articles?sortBy=sold&order=desc&limit=10&skip=5')
                    .then(response => response.data);

    return {
        type: 'get_products_by_sales',
        payload: request
    }

}

export function getProductsByArrival(){
    const request = axios.get('/api/product/articles?sortBy=createdAt&order=desc&limit=5')
    .then(response => response.data);

    return {
        type: 'get_products_by_arrival',
        payload: request
    }
}

export function getProductsToShop(skip, limit,filters =[], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post('/api/product/shop',data)
                .then(response => {
                    let newState = [
                        ...previousState,
                        ...response.data.articles
                    ];
                    return {
                        size: response.data.size,
                        articles: newState
                    }
                });

    return {
        type: 'get_products_to_shop',
        payload: request
    }

}

export function getBrands(){

    const request = axios.get('api/product/brands')
                .then(response => response.data );

    return {
        type: 'get_brands',
        payload: request
    }

}

export function getCategories(){
    const request = axios.get('/api/product/categories')
    .then(response => response.data );

    return {
        type: 'get_categories',
        payload: request
    }
}
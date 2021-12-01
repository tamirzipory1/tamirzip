import axios from 'axios';

import React, { useEffect} from 'react'
import Product from '../components/Product'
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { listProduct } from '../actions/productActions';
import {useDispatch, useSelector} from 'react-redux';


function HomeScreen() {
  const dispatch = useDispatch();
  const productList =  useSelector((state) => state.productList);
  const { loading, err, products} = productList;
 
  useEffect(() =>{
      dispatch(listProduct());
  }, [dispatch]);
  
    return (
        <div>
          {loading? ( <LoadingBox></LoadingBox>
           ) : err ? (
           <MessageBox variant="danger">{err}</MessageBox>
           )  :
        <div className="row center">
           {products.map((product) =>(
           <Product key={product._id} product={product}> </Product>
           ))}
                </div>            
        }
        </div>
    )
}

export default HomeScreen

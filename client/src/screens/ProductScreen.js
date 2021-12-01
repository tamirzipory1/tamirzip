import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating';
import {Link} from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import {detailsProduct} from '../actions/productActions';
function ProductScreen(props) {

   const dispatch = useDispatch();
   const productId = props.match.params.id;
   const [qty, setQty] = useState(1);
   const productDetails = useSelector((state) => state.productDetails);
   const {loading, err, product} = productDetails;

    

    useEffect(() =>{
        dispatch(detailsProduct(productId));
    },[dispatch, productId]);

    function addToCartHandle(){
        props.history.push(`/cart/${productId}?qty=${qty}`);
        
    };

    return (
        <div>
        {loading? ( <LoadingBox></LoadingBox>
         ) : err ? (
         <MessageBox variant="danger">{err}</MessageBox>
         )  : (

             <div>
           <Link to="/">Back to result</Link>
           <div className="row">
               <div className="col-2">
                   <img className="large" src={product.image} alt={product.name}/>
               </div>
               <div className="col-1">
                   <ul>
                       <li>
                           <h1>{product.name}</h1>
                       </li>
                       <li>
                           <Rating
                           rating={product.rating}
                           numReviews={product.numReviews}></Rating>
                       </li>
                       <li>
                           price: ${product.price}
                       </li>
                       <li>
                           description: 
                           <p>{product.description}</p>
                       </li>
                   </ul>
               </div>
               <div className="col-1">
                   <div className="card card-body">
                       <ul>
                           <li>
                               <div className="row">
                                   <div>Price</div>
                                    <div className="price">${product.price}</div>
                               </div>
                           </li>
                           <li>
                               <div className="row">
                                   <div>Status</div>
                                   <div>${product.countInStock>0? (
                                   <span className="success"> In Stock</span>
                                   ):(
                                   <span className="danger">Unavailable</span>
                        )}
                                   </div>
                               </div>
                           </li>
                           
                               {product.countInStock > 0 && (
                             <div>
                              <li>
                                  <div className="row">
                                      <div>Qty</div>
                                      <div>
                                          <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                              {
                                                  [...Array(product.countInStock).keys()].map((x) =>(
                                                      <option key={x+1} value={x + 1}>{x + 1}</option>
                                                  ))
                                              }
                                          </select>
                                      </div>
                                  </div>
                              </li>
                                <li>
                               <button onClick={addToCartHandle} className="primary block">Add to cart</button>
                           </li>
                           </div>
                               )}    
                       </ul>

                   </div>
               </div>
           </div>
       </div>
             
         )}
      </div>
      
      
    )
}

export default ProductScreen

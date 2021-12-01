import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProduct , createProduct, deleteProduct} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

function ProductListScreen(props) {
    const productList = useSelector((state) =>state.productList);
    const { loading, err, products } = productList;

    const productCreate = useSelector((state) => state.productCreate);
    const{
        loading: loadingCreate,
        err: errCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    const productDelete = useSelector((state) => state.productDelete);
    const{
        loading: loadingDelete,
        err: errDelete,
        success: successDelete,
    } = productDelete;

    const dispatch = useDispatch();
    useEffect(() =>{
        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProduct());
    }, [dispatch, createdProduct, props.history, successCreate, successDelete]);

    function deleteHandler(product){
            if(window.confirm("Are you sure to delete?")){
                dispatch(deleteProduct(product._id));
            }
    }
    function createHandler(){
        dispatch(createProduct());
    };
    return (
        <div>

            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Create Product
                </button>
            </div>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errDelete && <MessageBox variant="danger">{errDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errCreate && <MessageBox variant="danger">{errCreate}</MessageBox>}
            
            {loading ? (
                <LoadingBox></LoadingBox>
            ):
                err ? (
                    <MessageBox variant="danger">{err}</MessageBox>
                ) : (
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                            {products.map((product) =>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button 
                                    type="button"
                                    className="small"
                                    onClick={() =>props.history.push(`/product/${product._id}/edit`)
                                    }    
                                    >Edit</button>

                                    <button 
                                    type="button"
                                    className="small"
                                    onClick={() => deleteHandler(product)}
                                    >Delete</button>
                                 
                                    </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                )
            
        }
        </div>
    )
}

export default ProductListScreen

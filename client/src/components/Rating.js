import React from 'react'

function Rating(props) {
    const {rating, numReviews} = props;
    return (

        <div className="rating">
                <span> <i className={ 
                    rating >=1
                    ?"fa fa-star"
                    : rating>=0.5
                    ?'fa fa-star-half-o'
                    :'fa fa-star-o'
                    }>
                     </i> 
                    </span>

                    <span> <i className={ 
                    rating >=1
                    ?"fa fa-star"
                    : rating>=0.5
                    ?'fa fa-star-half-o'
                    :'fa fa-star-o'
                    }>
                     </i> 
                    </span>

                    <span> <i className={ 
                    rating >=1
                    ?"fa fa-star"
                    : rating>=0.5
                    ?'fa fa-star-half-o'
                    :'fa fa-star-o'
                    }>
                     </i> 
                    </span>

                    <span> <i className={ 
                    rating >=1.5
                    ?"fa fa-star"
                    : rating>=0.5
                    ?'fa fa-star-half-o'
                    :'fa fa-star-o'
                    }>
                     </i> 
                    </span>

                    <span> <i className={ 
                    rating >=2
                    ?"fa fa-star"
                    : rating>=0.5
                    ?'fa fa-star-half-o'
                    :'fa fa-star-o'
                    }>
                     </i> 
                    </span>
                    <span name="change">{numReviews + ' reviews'}</span>
            </div>
  
    )
}

export default Rating

import React from 'react';

function AllCategories(props){
    return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card text-white bg-dark  shadow">
                    <div className="card-body">
                        {`${props.nombre}:   ${props.count}`}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default AllCategories;
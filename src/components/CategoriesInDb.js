import React from 'react';
import AllCategories  from './AllCategories';

function CategoriesInDb(){
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    //   let endpoint = 'http://localhost:3030/api/products';
    let endpoint = 'https://grupo2-sprint8-api.herokuapp.com/api/products';
      fetch(endpoint)
      .then(response => response.json())
      .then(data => {
          if(!data.errors){
/*               delete data.info.status;
              delete data.info.total;
              delete data.info.url; */
              setCategories(data.meta.countByCategory);
          }
      })
  },[])

  let categoriesCount = [
      {nombre: 'Mesas', count: categories.Mesas},
      {nombre: 'Mesas Ratonas', count: categories.MesasRatonas},
      {nombre: 'Espejos', count: categories.Espejos},
      {nombre: 'Escritorios', count: categories.Escritorios},
  ]

  return (
      <React.Fragment>
              {/*<!-- Categories in DB -->*/}
              <div className="col-lg-6 mb-4">						
                  <div className="card shadow mb-4">
                      <div className="card-header py-3">
                          <h6 className="m-0 font-weight-bold text-gray-800">Categorías de productos</h6>
                      </div>
                      <div className="card-body">
                          <div className="row">
                              {
                                  categoriesCount.map((category,index)=>{
                                      return  <AllCategories  {...category}  key={index} />
                                  })
                              }
                          </div>
                      </div>
                  </div>
              </div>
         
      </React.Fragment>
  )

}
export default CategoriesInDb;


//Logramos la visual, pero no nos trae la info de nuestra BD para el conteo
// Detecta con http://localhost:3000/categories-in-db el cambio pero no trae la info.
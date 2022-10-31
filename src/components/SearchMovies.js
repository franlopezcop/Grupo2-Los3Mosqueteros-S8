import { useEffect, useRef, useState} from "react";
import noPoster from "../assets/images/no-poster.png";

function SearchMovies() {
  
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('Debe ingresar una palabra');

  useEffect(() => {
    let url
    if (keyword === "Debe ingresar una palabra") {
      url = 'https://grupo2-sprint8-api.herokuapp.com/api/products';
    } else {
      url = `https://grupo2-sprint8-api.herokuapp.com/api/products?search=${keyword}`
    }
    fetch(url)
      .then( response => response.json())
      .then( data => {
        if ( Array.isArray(data.data)) {
          setProducts(data.data)
        } else {
          setProducts([])
        }
      })

  }, [keyword])

  const search = useRef();

  function handleSubmit (e) {
    e.preventDefault();
    let value = search.current.value;
    setKeyword(value)
  };
  
  // const movies = [
  //   {
  //     Title: "Parchís",
  //     Year: "1983",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BYTgxNjg2MTAtYjhmYS00NjQwLTk1YTMtNmZmOTMyNTAwZWUwXkEyXkFqcGdeQXVyMTY5MDE5NA@@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Brigada en acción",
  //     Year: "1977",
  //     Poster: "N/A",
  //   },
  // ];

  return (
    <div className="container-fluid">

        <>
          <div className="row my-4">
            <div className="col-12 col-md-6">
              {/* Buscador de Películas */}
              <form onSubmit={handleSubmit}>  {/* A esta etiqueta form debemos agregar el onSubmit con una funcion dentro */}
                <div className="form-group">
                  <label htmlFor="">Buscar por nombre:</label>
                  <input ref={search} type="text" className="form-control" />
                </div>
                <button className="btn btn-info">Search</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Productos para la palabra: {keyword}</h2>
            </div>
            {/* Listado de Películas */}
            {/* Si hay películas mostrar el listado */}
            {products.length > 0 ? (
              products.map((product, i) => {
                return (
                  <div className="col-sm-6 col-md-4 my-4" key={i}>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h5 className="text-center m-0 font-weight-bold text-gray-800">
                          {product.name}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            // Si existe movie.Poster y si es distinto "N/A", mostramos movie.Poster y si no mostramos la imagen local noPoster importada de los assets
                            src={
                              product.image
                                ? `https://grupo2-sprint8-api.herokuapp.com/${product.image}`
                                : noPoster
                            }
                            alt={product.name}
                            style={{
                              width: "90%",
                              //height: "400px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div>
                            <p className="text-center">Precio: {product.price}</p>
                            <p className="text-center">Descuento: {product.discount} %</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Si no hay películas deberemos mostrar el siguiente mensaje
              <div className="alert alert-warning text-center">
                No se encontraron productos
              </div>
            )}
          </div>
        </>
    </div>
  );
}

export default SearchMovies;
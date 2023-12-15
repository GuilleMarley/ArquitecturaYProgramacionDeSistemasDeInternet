// Tipos
//Creamos una interfaz que recoge los datos de la API
export interface ResponseData {
    statusCode:  number;
    message:     string;
    pagination:  Pagination;
    totalQuotes: null;
    data:        QuoteType[];
}

//Pagination se compone de distintos elementos que declaramos aqui
export interface Pagination {
    currentPage: null;
    nextPage:    null;
    totalPages:  null;
}

//Para monstrar los datos creamos un tipo adecuado
type QuoteType = {
    quoteText : string
    quoteAuthor : string
    quoteGenre : string
}

//Creamos la funcion que va a buscar en la API los datos que necesitamos
//Esta creada de forma asincrona para que se haga todo en el orden que quiero
//Le pasamos como dato el numero de pagina al que queremos que acceda de la API y en el json
const fetchData = async (pageNumber: string) => {  
    
  try {
    // Fetch a resource from the network. It returns a Promise
    // that resolves to the Response to that Request, whether it is successful or not.
    //Al link le añadimos el numero de pagina que pasamos por referencia
    const link = `https://quote-garden.onrender.com/api/v3/quotes?page=${pageNumber}`

    const response = await fetch(
        link
    );

    // Takes a Response stream and reads it to completion. It returns a promise that resolves
    // with the result of parsing the body text as JSON.
    const data: ResponseData = await response.json();
    //Recorremos todos los datos de una pagina de frases celebres ya que arriba en el tipo de dato hemos puesto que es un array
    data.data.forEach(quote => {
        console.log("---------------------------------")
        console.log("Nombre del autor: ", quote.quoteAuthor, "\nFrase del autor: ", quote.quoteText, "\nGenero de la frase: ", quote.quoteGenre)
      })
  } catch (error) {
    // Debemos tratar siempre los errores cuando trabajemos con Promesas
    console.log(error);
  }
};
//Como en el enunciado pide 30 le pedimos la funcipn 3 paginas distintas
await fetchData("1000");
await fetchData("2000");
await fetchData("4000");

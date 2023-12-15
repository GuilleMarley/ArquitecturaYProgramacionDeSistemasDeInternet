//Creo el tipo libro con los parametros necesario y con el tipo de dato que son
type Libro = {
    id: number
    title: string|null
    author: string|null
    pages: string|null
    genre: string|null
}

//Creo un array que va a ser mi biblioteca y un contador que va a servir para poner el id de los libros sin que se repitan
const biblioteca: Libro[] = [];
let counter = 0;
//Creo un bucle a modo de menu
while(1){
    //Le pido que quiere hacer al usuario
    const option = prompt("1.Create book.\n2.Filter by genre.\n3.Remove book.\n4.EXIT.\n");

    if (option == null){
        console.log("NOT AVAILABLE OPTION SELECTED");
    }else{
        //La primera opcion es crear un libro en la biblioteca
        //le pido al usuario los datos y creo un libro variable con esos datos 
        //este libro luego lo añado al array de mi biblioteca y muestro los libros que hay
        if(parseInt(option) === 1){

            const title_var = prompt("Introduce el titulo del libro: ");
            const author_var = prompt("Introduce el autor del libro: ");
            const pages_var = prompt("Introduce el numero de paginas del libro: ");
            const genre_var = prompt("Introduce el genero del libro: ");
            const id_var: number = counter


            const libro_var = {
                id : id_var,
                title: title_var,
                author: author_var,
                pages: pages_var,
                genre: genre_var,
            }

            biblioteca.push(libro_var)

            console.log("Actualmente hay estos libros:\n ", biblioteca)

            //la opcion 2 es buscar por genero para lo que hago un filter y compruebo si coincide alguno de la biblioteca
       } else if(parseInt(option) === 2) {

           //biblioteca.filter((e)=>console.log(e))
           const genreSearch = prompt("Que genero estas buscando?")
           const genreFound = biblioteca.filter((libro) => libro.genre === genreSearch)
           console.log("Hay estos libros con el genero ", genreSearch, "\n", genreFound)

           //Aqui borraria libro pero no me funcionaba bien y prefiero que compile
       } else if(parseInt(option) === 3){

            console.log("Borro libro.\n")
       
        } else if(parseInt(option) === 4){
            break;
       }else {
            console.log("-------------------")
            console.log("Not a good choice.")
            console.log("-------------------")
            continue;
       }
        
   }
   counter++
 }


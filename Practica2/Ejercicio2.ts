//Creamos los tipos para coger los datos de la API
//El primer tipo es el mas necesario de Pokemon
type Pokemon = {
    name : string
    id : number
    types : types[]
    abilities : abilities[]
}

//Esta interfaz es necesaria para leer el tipo del pokemon ya que en la API no estan en la raiz
export interface types {
    slot: number
    type: PokemonType[]

}

//Esta es la raiz de los tipos si accedemos a "https://pokeapi.co/api/v2/type"
type PokemonType = {
    name: string
    id: number
    generation: generation[]
}

//Se necesita esta interfaz para acceder a la generacion en la que cada tipo fue añadido
export interface generation {
    name: string

}

//Esta interfaz es necesaria para leer las habilidades del pokemon ya que en la API no estan en la raiz
export interface abilities {
    abilty: Ability[]
    is_hidden: boolean
    slot: number
}

type Ability = {
    name: string
}

//Esta funcion es la que va a cargar la API y la que uso para monstrar los datos
//Le paso por referencia dos parametros el primero es una ruta que me sirve para distinguir si se va a buscar por tipo o por pokemon
//Buscar esto "https://pokeapi.co/api/v2/type" o esto "https://pokeapi.co/api/v2/pokemon"
//El segundo parametro va a ser lo que el usuario quiere buscar ya sea un pokemon o un tipo o un id
const fetchData = async (route: string, pokemonSearch: string|null) => {  
    //El link lo compruebo en un try/catch porque puede haber algun error con el input y es una promesa que hay que tratar en try/catch
    try {
      //Añado al link la ruta y la busqueda del usuario
      const link = `https://pokeapi.co/api/v2/${route}/${pokemonSearch}`
  
      const response = await fetch(
          link
      );
        //En caso de que el usuariobusque por pokemon muestro los datos de pokemon y en caso de que sea tipo los datos de tipo
      if(route === "pokemon"){
      const pokemon: Pokemon = await response.json();
  
      console.log("Name: ", pokemon.name, "\nPokemon Id: ", pokemon.id, "\nTypes: ", pokemon.types,"\nAbilities: ", pokemon.abilities)
      } else {
        const pokemonType: PokemonType = await response.json();
  
        console.log("Name: ", pokemonType.name, "\nType Id: ", pokemonType.id, "\nGeneration introduced: ", pokemonType.generation)
      }
    } catch (error) {
      // Debemos tratar siempre los errores cuando trabajemos con Promesas
      console.log(error);
    }
  };

  //Creo un bucle infinito del que usuario podra salir luego y creo un menu con if/else aunque podria haber usado switch/case
  //Pero ya que solo son dos opciones no uso mucha memoria
  while(1){
    //Esto son pruebas
     //await fetchData ("pokemon", "ditto");
     //await fetchData ("pokemon", "gallade");
     //await fetchData ("type", "dragon");
     //Le pido al usuario que opcion quiere
    const option = prompt("1.Choose Pokemon type.\n2.Choose Pokemon.\n0.EXIT.\n:");
    //En caso de no meter nada la opcion sera NULL
    if (option == null){
        console.log("NOT AVAILABLE OPTION SELECTED");
    }else{
        
        //Segun la opcion que elija el usuario fuerzo la ruta a ser tipo o pokemon
        //Y paso a la funcion la busqueda del usuario y la ruta
        if(parseInt(option) === 1){
            const route1 = "type"
            const typeSearch = prompt("Please enter pokemon type by id(1-18) or by name: ");
            await fetchData ( route1, typeSearch );
            
        } else if(parseInt(option) === 2) {
            const route = "pokemon"
            const nameSearch = prompt("Please enter pokemon name by id(1-1017) or by name: ");
            await fetchData ( route, nameSearch );

        } else if (parseInt(option) === 0){
            break;
        } else {
            console.log("-------------------")
            console.log("Not a good choice.")
            console.log("-------------------")
            continue;
        }

    }
    
  }
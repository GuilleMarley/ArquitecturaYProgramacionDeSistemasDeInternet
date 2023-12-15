const func = ( a : number[] ) => {

    a[0]=7;
  
  }
  
  let miArr = [1,2,3];
  func(miArr)
  console.log(miArr);
  // la sintaxis es arr.forEach((elem:number), (indice)) y luego se manejan el numero de datos

  //MONSTRAR POR PANTALLA EL DOBLE DE LOS QUE SON PARES
  const arr : number[] = [2,3,4,6,7]
  arr.filter ( (e) => e%2 === 0 ) //filtra pares
    .map((e) => 2*e) //multiplica los restantes por dos
        .forEach((e)=> console.log(e)); //los muestra uno a uno por pantalla

const a = arr.some (e => {
    console.log(e);
    if( e === 4) return true;
    return false;
})

console.log(a);


const arr1 = [
    ["pedro", "maria"],
    ["luis", "luisa"],
    ["pepe", "pepi"],
]

const pareja : string[] | undefined = arr1.find( parejas => parejas[0] === "luis" && parejas[1] === "luisa")
console.log(arr1);
console.log(pareja);

const arr2 = arr1.flatMap(a => a);
console.log(arr2);

//clases
type Persona = {
    name: string,
    age : Number,
    car : boolean,
}

const yo : Persona = {
    name: "Guille",
    age : 22,
    car : true,
    
}

console.log(yo.name)

const diego : Persona = {
    name: "Diego",
    age : 22,
    car : false,
    
}
const juan : Persona = {
    name: "Juan",
    age : 22,
    car : true,
    
}
const lucia : Persona = {
    name: "Lucia",
    age : 22,
    car : true,
    
}
const people = [yo, diego, juan, lucia]

const tieneCar = people
                .filter ( p => p.car)
                .map( p => p.name)
console.log(tieneCar)

const firstCar = people.find ( p => p.car)
console.log(firstCar)

const allCar = people.every ( p => p.car)
console.log("Todos tienen coche? " + allCar)

const claves = Object.keys( yo ) //["name", "edad", "coche"]

claves.forEach( k => console.log( yo[ k as keyof Persona ] ) )


const arry = [2, 3, 4, 5, 6]

const doble = arry.reduce( (x: number[], e) => {
    x.push( 2*e )
    return x;
}, [])

console.log(doble)
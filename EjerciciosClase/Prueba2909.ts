const numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(numeros.filter(a => a%2==0))


type Estudiante ={
    nombre : string,
    nota : number,
};
const estudiantes: Estudiante[] = [
    { nombre: "Alicia", nota: 85 },
    { nombre: "Luis", nota: 70 },
    { nombre: "Carlos", nota: 56 },
    { nombre: "David", nota: 60 },
];


const NotaSt = estudiantes.filter(st => st.nota >= 60) 
                            .map(p => p.nombre);


const numeros1: number[] = [5, 10, 15, 20, 25];
const sumaArr1: number = numeros1.reduce( (x: number, e )=> x + e, 0)
console.log(sumaArr1);

const palabras: string[] = ["manzana", "banana", "fresa", "kiwi", "sandía"];
const maxWord2 = palabras.reduce((acc, p) => acc.length > p.length ? acc : p, "")
console.log(maxWord2)

const studentGrade1: boolean = estudiantes.every(st => st.nota>50);
console.log(studentGrade1?"Todos tienen mas de 50":"No todos tienen mas de 50")

const studentGrade2: boolean = estudiantes.every(st => st.nota<50);
console.log(studentGrade1?"Hay alguno con menos de 50":"Todos han obtenido msa de 50")

console.log(NotaSt);

const multiNum = numeros.filter(a => a%2 != 0)
                        .map((e) => 3*e)

console.log(multiNum)
 
const multiNum1 = numeros.reduce( ( x:number[] , y) => {
    if(y%2===0){
        x.push(2*y);
    }
    else x.push(3*y);
    return x;
}
,[])

console.log(multiNum1)
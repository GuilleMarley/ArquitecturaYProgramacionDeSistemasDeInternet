const arr:string[] = ["hola", "que", "tal", "estas"]
const arrNum:number[] = [24, 9, 3, 332, 12]
const arrFrutas:string[] = ["Manzana", "Mandarina", "Naranja", "Pera", "Platano"]

arr.forEach(e => console.log(e.length))//Muestra el tamaño de las palabras del array

arr.map(e => e.length).forEach(e => console.log (e))//Muestra el tamaño de las palabras del array

const mayor:boolean = arrNum.some(e => e > 10)//mmuestra si hay mayores de 10 en el array
console.log(mayor);

console.log(mayor?"Hay alguno" : "No hay ninguno")// if simplificado 

const palabrasSeleccionadas: string[] = arrFrutas.filter(f => f[0] ==="M")//filtra las palabras que empiezan por M
console.log(palabrasSeleccionadas)

const sumaArr: number = arrNum.reduce( (x: number, e )=> x + e, 0)//suma todos los numeros de un array
console.log(sumaArr)

type Student = {
    name: string,
    grade: number,
}

const students: Student[] = [
    {
        name: "juan",
        grade: 56,
    },
    {
        name: "diego",
        grade: 67,
    },
    {
        name: "lucia",
        grade: 78,
    },
    {
        name: "david",
        grade: 89,
    }
]

const studentGrade: boolean = students.every(st => st.grade>70);//Comprobar si las notas de todos estan por encima de 70
console.log(studentGrade? "Todos tienen mas de 70" : "No todos tienen mas de 70")


const arrAverageSize: number = arr.map(p => p.length) //media del tamaño de las palabras
                    .reduce( ( acc, l ) => l+acc, 0)
                    / palabrasSeleccionadas.length
console.log(arrAverageSize)

const higherSizeWord = arr.map(p => length) //encontrar el tamaño
                        .reduce( ( acc, p ) => { // para poner este if en una linea .reduce((acc,l)=> acc>l? acc : l, 0)
                            if(acc > p ){
                                return acc;
                            }
                            else return p;
                        } , 0)
const maxWord = arr.find( p=>p.length === higherSizeWord)

const maxLongitud = arr.reduce((acc, p) => acc > p.length ?acc:p.length, 0)//segunda forma de hacerlo
const maxPalabra = arr.find(p=> p.length === maxLongitud)

const maxWord1 = arr.reduce((acc, p) => acc.length > p.length ? acc : p, "") //tercera froma de hacerlo


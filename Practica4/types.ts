export type Car = {
    tag: string,
    brand: string,
    model: string,
    price: number,
 }

 export type Dealer = {
    name: string,
    allowance: boolean,
    cars: Car[],
 }

 export type Client = {
    dni: string,
    name: string,
    cars: Car[],
    walletSize: number,
 }

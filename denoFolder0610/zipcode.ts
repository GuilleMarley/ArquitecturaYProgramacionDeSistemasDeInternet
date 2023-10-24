
type Place = {
    city: string,
    country: string,
}

const getPlace = async (zipcode: number):Promise<Place>=> {

    const base_url = "http://postalcode.parseapi.com/api"
    const API_KEY = "bba8d9a18f34b401737a1d0ada8b08c1"

    const url = `${base_url}/${API_KEY}/${zipcode}`

    const data = await fetch(url)

    if(data.status != 200){
        throw new Error("Bad request")
    }

    const json = await data.json()
    const city = json.city.name
    const country = json.country.name

    return {
        city,
        country,
    }

}

export default getPlace
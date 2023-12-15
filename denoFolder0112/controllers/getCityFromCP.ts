const getCityFromCP = async (cp: string): Promise<string> => {
    const API_URL = "https://zip-api.eu/api/v1";
    const url = `${API_URL}/info/ES-${cp}`;
    const response = await fetch(url);
    if(response.status !== 200){
        throw new Error("CP not valid");
    }
    const data = await response.json();
    const city = data.state;
    return city;
}

export default getCityFromCP;
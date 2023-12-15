
const checkCP = async (cp: string):Promise<boolean> => {
    const API_URL = "https://zip-api.eu/api/v1";
    const url = `${API_URL}/info/ES-${cp}`;
    const response = await fetch(url);
    if(response.status !== 200){
        return false;
    }
    return true;
}

export default checkCP;
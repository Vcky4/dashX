import endpoints from "../../assets/endpoints/endpoints";

export default getPlaceDetails = async (address, callback) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&sensor=true&key=${endpoints.gg}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data?.results[0]?.types);
    return callback(data?.results);
}
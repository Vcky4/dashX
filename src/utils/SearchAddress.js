import endpoints from '../../assets/endpoints/endpoints';

export default searchAddress = async (query,lat, lng, callback) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&location=${lat}%2C${lng}&radius=500&key=${endpoints.gg}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data?.predictions);
    return callback(data?.predictions);
}

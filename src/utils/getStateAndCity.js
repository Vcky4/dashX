import endpoints from '../../assets/endpoints/endpoints';

export default getCityAndState = async (placeId, callback) => {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${endpoints.gg}`;

  const detailsResponse = await fetch(detailsUrl);
  const detailsData = await detailsResponse.json();
  if (detailsData.result) {
    const addressComponents = detailsData.result.address_components;
    const state = addressComponents.find(component =>
      component.types.includes('administrative_area_level_1'),
    );
    const city = addressComponents.find(component =>
      component.types.includes('locality'),
    );
    // console.log(state?.long_name, city?.long_name);
    callback({state:state?.long_name || '', city:city?.long_name || ''});
  } else {
    console.error('Details data is missing or incomplete');
  }
};

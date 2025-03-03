import axios from 'axios';

export const getLocationFromCoordinates = async (coordinates: { lat: number, lng: number }) => {
    const apiKey = process.env.GOOGLE_API_KEY as string;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${apiKey}`;
    const response = await axios.get(url);
    return response.data.results[0]?.formatted_address || 'Ubicación desconocida';
};
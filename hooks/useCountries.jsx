import { useEffect, useState } from 'react';

const X_RAPIDAPI_KEY = String(process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY);
const X_RAPIDAPI_HOST = String(process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST);
const X_RAPIDAPI_API_URL = String(process.env.NEXT_PUBLIC_X_RAPIDAPI_API_URL);

const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': X_RAPIDAPI_HOST,
      },
    };

    fetch(X_RAPIDAPI_API_URL, options)
      .then((response) => response.json())
      .then((response) => {
        // use flatMap to flatten the array of arrays
        const countryObjects = response
          .flatMap((country) => {
            return {
              id: country.key.toLowerCase(),
              name: country.value,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        const globalLocations = [{ id: 'remote', name: 'Remote' }];

        setCountries([...countryObjects, ...globalLocations]);
      })
      .catch((err) => console.error(err));
  }, []);

  return countries;
};

export default useCountries;

import { useEffect, useState } from 'react';

const useCountries = () => {
  const [allCountries, setAllCountries] = useState([]);
  // fetch all Countries
  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data) => {
        const sortedCountries = data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        setAllCountries(sortedCountries);
      });
  }, []);

  return allCountries;
};

export default useCountries;

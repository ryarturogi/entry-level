import { useEffect, useState } from 'react';

const useSkills = () => {
  const [allSkills, setAllSkills] = useState([]);
  // fetch all skills
  useEffect(() => {
    fetch('/api/p-languages')
      .then((res) => res.json())
      .then((data) => {
        setAllSkills(data);
      });
  }, []);

  return allSkills;
};

export default useSkills;

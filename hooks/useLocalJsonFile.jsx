import path from 'path';
import { useEffect, useState } from 'react';

function useLocalJsonFile(filePath) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/${path.join('api', filePath)}`);
      const jsonData = await response.json();
      setData(jsonData);
    }
    fetchData();
  }, [filePath]);

  return data;
}

export default useLocalJsonFile;

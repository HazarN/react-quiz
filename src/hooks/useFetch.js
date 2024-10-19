// Libs
import { useEffect } from 'react';

export function useFetch(url) {
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, [url]);
}

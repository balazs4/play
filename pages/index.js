import { useState, useEffect } from 'react';

function useGraphql(query) {
  const [response, setResponse] = useState({ status: null, body: null, error: null });
  useEffect(() => {
    setResponse({ status: 'pending', body: null, error: null });
    fetch('/api/graphql', {
      body: query,
      method: 'post'
    })
      .then((res) => {
        console.log(res);
        return res.json().then((body) => ({ status: res.status, body }));
      })
      .then((res) => {
        setResponse({ status: res.status, body: res.body, error: null });
      })
      .catch((error) => {
        setResponse({ status: 'failed', body: null, error: error.message });
      });
  }, [query]);
  return response;
}

export default function Index() {
  const response = useGraphql(`{ hello }`);
  return <code>{JSON.stringify(response, null, 2)}</code>;
}

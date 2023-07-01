import React, { useState } from 'react';
let cancel;
const Search = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  return <div>this is search</div>;
};

export default Search;

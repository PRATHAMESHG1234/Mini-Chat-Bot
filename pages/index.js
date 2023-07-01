import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';

export default function Home({ user }) {
  useEffect(() => {
    document.title = `Welcome, ${user.name.split(' ')[0]}`;
  }, []);
  return <div>This is the Home page</div>;
}

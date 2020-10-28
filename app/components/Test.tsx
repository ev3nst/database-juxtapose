import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function Test(): JSX.Element {
  return (
    <div data-tid="container">
      <h2>Test</h2>
      <Link to={routes.HOME}>to HOME PAGE</Link>
    </div>
  );
}

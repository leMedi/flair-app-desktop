import React from 'react';
import { Link } from 'react-router-dom';
import Exception from '../../components/Exception';

const Exception500 = () => (
  <Exception
    type="500"
    desc='app.exception.description.500'
    linkElement={Link}
    backText='app.exception.back'
  />
);

export default Exception500;

import React from 'react';
import { Link } from 'react-router-dom';
import Exception from '../../components/Exception';

const Exception404 = () => (
  <Exception
    type="404"
    desc='app.exception.description.404'
    linkElement={Link}
    backText='app.exception.back'
  />
);

export default Exception404;

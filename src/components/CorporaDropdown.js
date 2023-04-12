import React, {useContext} from 'react';
import {DracorContext} from '../context';
import TopNavDropdown from './TopNavDropdown';

const CorporaDropdown = () => {
  const {corpora} = useContext(DracorContext);

  const items = corpora.map((c) => ({
    to: `/${c.corpusName}`,
    label: c.corpusTitle,
  }));

  return <TopNavDropdown label="Corpora" items={items} />;
};

export default CorporaDropdown;

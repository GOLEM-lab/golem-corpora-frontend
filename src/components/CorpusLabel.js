import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classnames from 'classnames/bind';
import style from './CorpusLabel.module.scss';

const cx = classnames.bind(style);

const CorpusLabel = ({corpusName, corpusTitle, acronym}) => {
  const prefix = acronym
    ? acronym.replace('Golem', '')
    : corpusName.charAt(0).toUpperCase() + corpusName.slice(1);

  return (
    <span className={cx('main')}>
      <Link to={`/${corpusName}`} title={corpusTitle || 'Corpus'}>
        <em>{prefix}</em>corpus
      </Link>
    </span>
  );
};

CorpusLabel.propTypes = {
  corpusName: PropTypes.string.isRequired,
  corpusTitle: PropTypes.string,
  acronym: PropTypes.string,
};

CorpusLabel.defaultProps = {
  corpusTitle: null,
  acronym: null,
};

export default CorpusLabel;

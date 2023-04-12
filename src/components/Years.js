import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export function formatEra(year, ceBefore = 0) {
  if (year === null) {
    return '';
  }

  const y = Number.parseInt(year, 10);

  if (y < 0) {
    return `${y * -1} BCE`;
  }

  if (y < ceBefore) {
    return `${y} CE`;
  }

  return String(y);
}

export function formatYear(yearString) {
  // range, both BCE
  if (yearString.match('^-[0-9]{4}/-[0-9]{4}$')) {
    const years = yearString.split('/').map((y) => Number.parseInt(y, 10) * -1);
    return `${years[0]}-${years[1]} BCE`;
  }

  // range, mixed era
  if (yearString.match('^-?[0-9]{4}/-?[0-9]{4}$')) {
    const years = yearString.split('/');
    return `${formatEra(years[0])}-${formatEra(years[1], 1000)}`;
  }

  // not before
  if (yearString.match('^>-?[0-9]{4}')) {
    const year = yearString.slice(1);
    return `after ${formatEra(year, 1000)}`;
  }

  // not after
  if (yearString.match('^<-?[0-9]{4}')) {
    const year = yearString.slice(1);
    return `before ${formatEra(year, 1000)}`;
  }

  // single year
  if (yearString.match('^-?[0-9]{4}')) {
    return formatEra(yearString, 1000);
  }

  return yearString;
}

const Years = ({created, first_fanfic}) => {
  return (
    <>
      {created && (
        <>
          <span title="created">
            <FontAwesomeIcon icon="pen-fancy" size="sm" />
            &nbsp;
            {formatYear(created)}
          </span>{' '}
        </>
      )}
      {first_fanfic && (
        <span title="first_fanfic">
          <FontAwesomeIcon icon="book" size="sm" />
          &nbsp;
          {formatYear(first_fanfic)}
        </span>
      )}
    </>
  );
};

Years.propTypes = {
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  first_fanfic: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Years.defaultProps = {
  created: null,
  first_fanfic: null,
};

export default Years;

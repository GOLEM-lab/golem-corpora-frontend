import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// Numbers received from the API can be in scientific notation (e.g.
// 8.248968E6), which is why we need to use parseFloat.
const fn = (val) => Number(Number.parseFloat(val)).toLocaleString('en');

const CorpusCard = ({
  displayId,
  displayName,
  displayAcronym,
  displayMetrics,
}) => {
  const prefix = displayAcronym
    ? displayAcronym.replace('Golem', '')
    : displayId.charAt(0).toUpperCase() + displayId.slice(1);
  return (
    <div className="corpus-card" xl={4} lg={6} md={6} sm={12} xs={12}>
      <Link to={`/${displayId}`}>
        <h2>
          <span>{prefix}</span>corpus
        </h2>
      </Link>
      <h3>
        <Link to={`/${displayId}`}>{displayName}</Link>
      </h3>
      <table>
        <tbody>
          <tr>
            <th className="number-plays">{fn(displayMetrics.documents)}</th>
            <td>number of documents</td>
          </tr>
          <tr>
            <th>
              {fn(displayMetrics.characters)}
              <br />
              <span>
                {displayMetrics.male +
                  displayMetrics.female +
                  displayMetrics.nonbinary >
                0
                  ? ` (M: ${displayMetrics.male}, F: ${displayMetrics.female}, N:${displayMetrics.nonbinary})`
                  : ''}
              </span>
            </th>
            <td>
              <code>person</code> + <code>personGrp</code>
              <br />
              number of characters
            </td>
          </tr>
          <tr>
            <th>
              {fn(displayMetrics.chapters)} <br />
              <span>{fn(displayMetrics.paragraphs)} </span> <br />
              <span>{fn(displayMetrics.wordcount.wordsInDocuments)} </span>
            </th>
            <td>
              <code>documents</code> <br />
              chapters <br />
              paragraphs <br />
              words in documents
            </td>
          </tr>
          <tr>
            <th>
              {fn(displayMetrics.comments)} <br />
              <span>{fn(displayMetrics.wordcount.wordsInComments)}</span>
            </th>
            <td>
              <code>comments</code>
              <br />
              words in comments
            </td>
          </tr>
          <tr>
            <th>Last update</th>
            <td>{new Date(displayMetrics.updated).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

CorpusCard.propTypes = {
  displayId: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  displayAcronym: PropTypes.string,
  displayMetrics: PropTypes.object.isRequired,
};

export default CorpusCard;

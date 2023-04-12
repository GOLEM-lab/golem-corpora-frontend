import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// Numbers received from the API can be in scientific notation (e.g.
// 8.248968E6), which is why we need to use parseFloat.
const fn = (val) => Number(Number.parseFloat(val)).toLocaleString('en');

const CorpusCard = ({corpusName, corpusTitle, acronym, metrics}) => {
  const prefix = acronym
    ? acronym.replace('Golem', '')
    : corpusName.charAt(0).toUpperCase() + corpusName.slice(1);
  return (
    <div className="corpus-card" xl={4} lg={6} md={6} sm={12} xs={12}>
      <Link to={`/${corpusName}`}>
        <h2>
          <span>{prefix}</span>corpus
        </h2>
      </Link>
      <h3>
        <Link to={`/${corpusName}`}>{corpusTitle}</Link>
      </h3>
      <table>
        <tbody>
          <tr>
            <th className="number-plays">{fn(metrics.documents)}</th>
            <td>number of documents</td>
          </tr>
          <tr>
            <th>
              {fn(metrics.characters)}
              <br />
              <span>
                {metrics.male + metrics.female + metrics.nonbinary > 0
                  ? ` (M: ${metrics.male}, F: ${metrics.female}, N:${metrics.nonbinary})`
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
              {fn(metrics.chapters)} <br />
              <span>{fn(metrics.paragraphs)} </span> <br />
              <span>{fn(metrics.wordcount.words_in_documents)} </span>
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
              {fn(metrics.comments)} <br />
              <span>{fn(metrics.wordcount.words_in_comments)}</span>
            </th>
            <td>
              <code>comments</code>
              <br />
              words in comments
            </td>
          </tr>
          <tr>
            <th>Last update</th>
            <td>{new Date(metrics.updated).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

CorpusCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  acronym: PropTypes.string,
  metrics: PropTypes.object.isRequired,
};

export default CorpusCard;

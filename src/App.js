import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faBook,
  faPenFancy,
  faTheaterMasks
} from '@fortawesome/free-solid-svg-icons';
import api from './api';
import {DracorContext} from './context';
import asyncComponent from './components/AsyncComponent';
import DramaIndex from './components/DramaIndex';
import DramaInfo from './components/DramaInfo';
import Home from './components/Home';
import TopNav from './components/TopNav';
import './App.css';

library.add(faBook, faPenFancy, faTheaterMasks);

const AsyncYasgui = asyncComponent(() => import('./components/Yasgui'));
const AsyncAPIDoc = asyncComponent(() => import('./components/APIDoc'));

const DramaPage = ({match}) => (
  <div style={{height: '100%'}}>
    <DramaInfo {...match.params}/>
  </div>
);

const App = () => {
  const [corpora, setCorpora] = useState([]);

  useEffect(() => {
    console.log('fetching corpora...');
    async function fetchCorpora () {
      try {
        const response = await api.get('/corpora');
        setCorpora(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCorpora();
  }, []);

  return (
    <Router>
      <DracorContext.Provider value={{corpora}}>
        <div className="d-flex flex-column" style={{height: '100%'}}>
          <TopNav/>
          <div className="content d-flex" style={{flex: 1}}>
            <Container fluid>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sparql" component={AsyncYasgui}/>
                <Route exact path="/documentation/api" component={AsyncAPIDoc}/>
                <Route exact path="/:corpusId" component={DramaIndex}/>
                <Route path="/:corpusId/:dramaId" component={DramaPage}/>
              </Switch>
            </Container>
          </div>
        </div>
      </DracorContext.Provider>
    </Router>
  );
};

export default App;

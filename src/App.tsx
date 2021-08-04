import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import api from './api';
import {ApiInfo} from './types';
import {DracorContext} from './context';
import asyncComponent from './components/AsyncComponent';
import Home from './components/Home';
import DocPage from './components/DocPage';
import TopNav from './components/TopNav';
import Corpus from './components/Corpus';
import './icons';

const AsyncYasgui = asyncComponent(() => import('./components/Yasgui'));
const AsyncAPIDoc = asyncComponent(() => import('./components/APIDoc'));

const App = () => {
  const [apiInfo, setApiInfo] = useState<ApiInfo | {}>({});
  const [corpora, setCorpora] = useState([]);

  useEffect(() => {
    console.log('fetching API info...');

    async function fetchInfo() {
      try {
        const response = await api.get('/info');
        if (response.ok) {
          setApiInfo(response.data as ApiInfo);
        } else {
          throw new Error(
            `Failed to load API info. Status: ${response.status}`
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchInfo();
  }, []);

  useEffect(() => {
    console.log('fetching corpora...');

    async function fetchCorpora() {
      try {
        const response = await api.get('/corpora');
        if (response.ok) {
          setCorpora(response.data as []);
        } else {
          throw new Error(`Failed to load corpora. Status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCorpora();
  }, []);

  return (
    <Router>
      <DracorContext.Provider value={{corpora, apiInfo}}>
        <div className="d-flex flex-column" style={{height: '100%'}}>
          <Route exact path="/documentation/api">
            <Redirect to="/doc/api" />
          </Route>
          <Route exact path="/about">
            <Redirect to="/doc/what-is-dracor" />
          </Route>
          <Route path="/" component={TopNav} />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/sparql" component={AsyncYasgui} />
              <Route exact path="/doc/api" component={AsyncAPIDoc} />
              <Route path="/doc/:slug" component={DocPage} />
              <Route path="/:corpusId" component={Corpus} />
            </Switch>
          </div>
        </div>
      </DracorContext.Provider>
    </Router>
  );
};

export default App;
import React, { useContext } from 'react';
import './App.css';
import DevtoolsPane from './devtoolsPane';
import { ObservableProvider } from './contexts/observableContext';


export default function App() {

  return (
    <ObservableProvider>
      <div className='App'>
        <DevtoolsPane />
      </div>
    </ObservableProvider>
  );
}

import React from 'react';
import './App.css';
import DevtoolsPane from './devtoolsPane';
import { ObservableProvider } from './contexts/observableContext';
import { EventProvider } from './contexts/eventContext';


export default function App() {

  return (
    <ObservableProvider>
      <EventProvider>
        <div className='App'>
          <DevtoolsPane />
        </div>
      </EventProvider>
    </ObservableProvider>
  );
}

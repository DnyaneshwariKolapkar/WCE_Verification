import React from 'react';
import Router from './router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter />
      <Router />
      <BrowserRouter />
    </>

  );
}

export default App;

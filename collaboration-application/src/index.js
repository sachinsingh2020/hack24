import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider as ReduxProvider } from 'react-redux'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
    <ReduxProvider store={store}>
    <App />
    </ReduxProvider>
    </BrowserRouter>
    
);


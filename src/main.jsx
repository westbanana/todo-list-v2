import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.module.scss'
import {Provider} from "react-redux";
import {store} from './store/index.js';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <DevSupport ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
    >
      <App/>
    </DevSupport>
  </Provider>
)

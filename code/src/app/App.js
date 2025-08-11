// /**
//  * Entry application component used to compose providers and render Routes.
//  * */
//
// import React from "react";
// import { Provider } from "react-redux";
// import { HashRouter } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";
// import { AppRoutes } from "../app/Routes";
// import { I18nProvider } from "../_metronic/i18n";
// import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
// import IdleLogoutWrapper from "./Admin/modules/Auth/pages/IdleLogoutWrapper";
//
// export default function App({ store, persistor, basename }) {
//   return (
//     /* Provide Redux store */
//     <Provider store={store}>
//       {/* Asynchronously persist redux-superadmin stores and show `SplashScreen` while it's loading. */}
//       <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
//         {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
//         <React.Suspense fallback={<LayoutSplashScreen />}>
//           {/* Override `basename` (e.g: `homepage` in `package.json`) */}
//           <HashRouter basename={basename}>
//             {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
//             <MaterialThemeProvider>
//               {/* Provide `react-intl` context synchronized with Redux state.  */}
//               <I18nProvider>
//                 {/* Security Headers using Helmet */}
//                 {/*<Helmet>*/}
//                 {/*  /!*<meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; frame-ancestors 'self'" />*!/*/}
//                 {/*  <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; frame-ancestors 'self'; connect-src *;" />*/}
//                 {/*  <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />*/}
//                 {/*  <meta httpEquiv="X-Content-Type-Options" content="nosniff" />*/}
//                 {/*  <meta httpEquiv="Cache-Control" content="no-store, no-cache, must-revalidate, private" />*/}
//
//                 {/*</Helmet>*/}
//
//                 {/* Render routes with provided `Layout`. */}
//                 <IdleLogoutWrapper>
//                 <AppRoutes />
//                 </IdleLogoutWrapper>
//               </I18nProvider>
//             </MaterialThemeProvider>
//           </HashRouter>
//         </React.Suspense>
//       </PersistGate>
//     </Provider>
//   );
// }


import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {I18nProvider} from "../_metronic/i18n";
import {LayoutSplashScreen, MaterialThemeProvider} from "../_metronic/layout";
import Router from "./Routes";


function App({store, persistor}) {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
          <React.Suspense fallback={<LayoutSplashScreen />}>
            <BrowserRouter>
              <MaterialThemeProvider>
                <I18nProvider>
                  <ToastContainer/>
                    <Router />
                </I18nProvider>
              </MaterialThemeProvider>
            </BrowserRouter>
          </React.Suspense>
        </PersistGate>
      </Provider>
  );
}
export default App;
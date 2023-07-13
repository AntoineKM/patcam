import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { RiEye2Line, RiSettings4Line } from "react-icons/ri";
import { Redirect, Route } from "react-router-dom";

import GlobalStyle from "./components/GlobalStyle";
import Camera from "./pages/Camera";
import Monitor from "./pages/Monitor";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "flvplayer/dist/flvplayer-control.js";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <GlobalStyle />
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path={"/monitor"}>
            <Monitor />
          </Route>
          <Route exact path={"/monitor/camera"}>
            <Camera />
          </Route>
          <Route exact path={"/signin"}>
            <SignIn />
          </Route>
          <Route exact path={"/signup"}>
            <SignUp />
          </Route>
          <Route path={"/settings"}>
            <Settings />
          </Route>
          <Route exact path={"/"}>
            <Redirect to={"/monitor"} />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot={"bottom"}>
          <IonTabButton tab={"monitor"} href={"/monitor"}>
            <RiEye2Line size={28} />
            <IonLabel>{"Surveillance"}</IonLabel>
          </IonTabButton>
          <IonTabButton tab={"settings"} href={"/settings"}>
            <RiSettings4Line size={28} />
            <IonLabel>{"Paramètres"}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

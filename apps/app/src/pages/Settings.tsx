import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import ExploreContainer from "../components/ExploreContainer";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{"Paramètres"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse={"condense"}>
          <IonToolbar>
            <IonTitle size={"large"}>{"Paramètres"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={"Ca arrive bientôt ! 🚧"} />
      </IonContent>
    </IonPage>
  );
};

export default Settings;

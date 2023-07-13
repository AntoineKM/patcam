// Import des composants et dépendances
import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import FlvPlayer from "flvplayer";
import React from "react";
import { RiMicLine } from "react-icons/ri";
import { styled } from "styled-components";

// Import du service de streaming
import { streamingEndpoint } from "../services/streaming";

// Définition du composant Camera
const Camera: React.FC = () => {
  // Utilisation de useEffect pour exécuter du code après le rendu initial du composant
  React.useEffect(() => {
    // Vérification de la prise en charge de Flvplayer.js par le navigateur
    if (FlvPlayer.isSupported()) {
      // Configuration de Flvplayer avec les paramètres nécessaires
      const flv = new FlvPlayer({
        container: ".flvplayer-app",
        poster: "./wallpaper.jpg",
        url: `${streamingEndpoint}/live/home.flv`,
        decoder:
          "https://flvplayer.js.org/uncompiled/flvplayer-decoder-multiple.js",
        debug: true,
        live: true,
        loop: true,
        autoPlay: true,
        hasAudio: true,
        control: true,
        muted: true,
        volume: 0.7,
        frameRate: 30,
        maxTimeDiff: 200,
        videoChunk: 1024 * 1024,
        audioChunk: 64 * 1024,
        width: 640,
        height: 360,
      });
      console.log("Flvplayer", flv);
    } else {
      console.warn("Your browser does not support Flvplayer.js");
    }
  }, []);

  // Rendu du composant Camera
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{"Surveillance ➞ Salon"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse={"condense"}>
          <IonToolbar>
            <IonTitle size={"large"}>{"RMTP"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Container>
          <FlvPlayerApp className={"flvplayer-app"} />
          <Content>
            <IonText>
              <h3>{"Salon"}</h3>
            </IonText>
            <IonText color={"medium"}>{"Active depuis 5 minutes"}</IonText>
          </Content>
          <TalkButton>
            <RiMicLine size={55} />
          </TalkButton>
        </Container>
      </IonContent>
    </IonPage>
  );
};

// Styles avec styled-components
const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const FlvPlayerApp = styled.div`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
`;

const TalkButton = styled.button`
  margin: 45px auto 0;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #eb445a;
`;

// Export du composant Camera
export default Camera;

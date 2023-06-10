import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import flvjs from "flv.js";
import React from "react";

import "./Tab1.css";
import { endpoint } from "../services/streaming";

const Tab1: React.FC = () => {
  React.useEffect(() => {
    if (flvjs.isSupported()) {
      const videoElement = document.getElementById(
        "videoPlayer"
      ) as HTMLVideoElement;

      // Create an instance of FLV.js player
      const flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: `${endpoint}/live/HELLO_WORLD.flv`,
      });

      // Attach the player to the video element
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    } else {
      console.error("FLV.js is not supported.");
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{"RMTP"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse={"condense"}>
          <IonToolbar>
            <IonTitle size={"large"}>{"RMTP"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <video id={"videoPlayer"} controls autoPlay />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

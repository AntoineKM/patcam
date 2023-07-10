import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import FlvPlayer from "flvplayer";
import React from "react";

import { streamingEndpoint } from "../services/streaming";

const Tab1: React.FC = () => {
  React.useEffect(() => {
    if (FlvPlayer.isSupported()) {
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
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
          }}
          className={"flvplayer-app"}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

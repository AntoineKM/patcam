import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Monitor: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{"Bienvenue Antoine 👋"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse={"condense"}>
          <IonToolbar>
            <IonTitle size={"large"}>{"Tab 3"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Container>
          <Link to={"/monitor/camera"}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{"Salon"}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>{"Active depuis 5 minutes"}</IonCardContent>
            </IonCard>
          </Link>
        </Container>
      </IonContent>
    </IonPage>
  );
};

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export default Monitor;

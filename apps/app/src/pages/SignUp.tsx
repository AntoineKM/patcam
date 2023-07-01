import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignUp: React.FC = () => {
  const [isTouched, setIsTouched] = React.useState(false);
  const [isValid, setIsValid] = React.useState<boolean>();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === "") return;

    // eslint-disable-next-line no-unused-expressions
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{"S'enregistrer"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse={"condense"}>
          <IonToolbar>
            <IonTitle size={"large"}>{"S'enregistrer"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Content>
          <IonInput
            className={`${isValid && "ion-valid"} ${
              isValid === false && "ion-invalid"
            } ${isTouched && "ion-touched"}`}
            type={"email"}
            fill={"solid"}
            label={"Adresse mail"}
            labelPlacement={"floating"}
            helperText={"Entrer une adresse mail valide"}
            errorText={"Adresse mail invalide"}
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
          />
          <IonInput
            type={"password"}
            fill={"solid"}
            label={"Mot de passe"}
            labelPlacement={"floating"}
            helperText={"Entrer un mot de passe valide"}
            errorText={"Mot de passe invalide"}
          />
          <IonButton>{"S'enregistrer"}</IonButton>
        </Content>
      </IonContent>
    </IonPage>
  );
};

const Content = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 750px;
  margin: 0 auto;
  padding: 15px;
  gap: 15px;
`;

export default SignUp;

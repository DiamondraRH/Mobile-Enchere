import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonBackButton,
} from "@ionic/react";
import "./Login.css";

import { useHistory } from "react-router";


const Signup: React.FC = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');

  const history  = useHistory();

  const inscription = async() => {
    const data = {email: email, mdp: mdp,nom:nom}
    const url = 'https://api-enchere-production.up.railway.app/utilisateurs/inscription';
    try {
        const response = await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        });
        if(!response.ok){
            throw Error(response.statusText)
        }
        history.push("/login");
    } catch (error) {
        console.error(error)
    }
}
  return (
    <IonPage id="signup-page main">
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/login"></IonBackButton>
          </IonButtons>
          <IonTitle>Inscription</IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent>
        <div className="login-logo">
          <img src="assets/img/appicon.png" alt="Ionic logo" />
        </div>

        <form>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Nom
              </IonLabel>
              <IonInput name="nom" type="text"  value = {nom} onIonChange = {e=>setNom(e.detail.value!)} placeholder="HASINJATO"></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary" >
                Email
              </IonLabel>
              <IonInput name="email" type="email" value={email} placeholder="larry@gmail.com" onIonChange = {e=>setEmail(e.detail.value!)}></IonInput>
            </IonItem>


            <IonItem>
              <IonLabel position="stacked" color="primary">
                Mot De Passe
              </IonLabel>
              <IonInput name="mdp" type="password" value = {mdp} placeholder="**********" onIonChange = {e=>setMdp(e.detail.value!)}></IonInput>
            </IonItem>

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton routerLink="/login" type="submit" expand="block" onClick={inscription}>
                S'inscrire
              </IonButton>
            </IonCol>
          </IonRow>

        </form>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
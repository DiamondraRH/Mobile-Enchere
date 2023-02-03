import React, { useState, useRef, useEffect } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonInput,
  IonButton,
  IonHeader,
  IonItem,
  IonLabel,
} from "@ionic/react";

import "./Enchere.css";
import { useHistory } from "react-router";

const Solde: React.FC = () => {
  const[solde,setSolde] = useState('');

  const[montant,setMontant] = useState('');
  const user = localStorage.getItem("user");

  const history = useHistory();
  
  const getSolde = async() => {
    const url = "https://api-enchere-production.up.railway.app/utilisateurs/"+user+"/solde";
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw Error(response.statusText)
      }
      const json = await response.json()
      setSolde(json.solde);
      } catch (error) {
          console.error(error)
      }
    }

    const send = async() => {
      const data = {montant: parseInt(montant), etat : 0 , utilisateur : {id_utilisateur : user}};
      console.log(data)
      const url = 'https://api-enchere-production.up.railway.app/rechargement';
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
        history.push("/ListeEnchere");
      } catch (error) {
          console.error(error)
      }
      }
    useEffect (() => {
      getSolde();
    });
  const pageRef = useRef<HTMLElement>(null);

  return (
    <IonPage ref={pageRef} id="schedule-page main">
      <IonHeader translucent={true}>
        <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          <IonTitle>Compte</IonTitle>

        </IonToolbar>
      </IonHeader>
      <br /><br />
      <IonContent fullscreen={true}>
            <IonLabel class="ion-text-center">Mon Solde : {solde} Ariary</IonLabel>
            <br /><br />
            <IonItem>
            <h3>Rechargez mon compte</h3>
            <IonLabel position="stacked" color="primary">Montant</IonLabel>
            <IonInput name="montant" type="text" id="montant" value={montant} onIonChange = {e => setMontant(e.detail.value!)}></IonInput>
            </IonItem>
            <br/>
            <IonButton type="submit" expand="block" onClick={send}>Envoyer demande</IonButton>
      </IonContent>
    </IonPage>
  );
};


export default Solde;

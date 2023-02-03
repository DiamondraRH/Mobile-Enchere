import React, { useEffect, useRef, useState } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonHeader,
  IonItem,
  IonCard,
  IonCardHeader,
  IonLabel,
} from "@ionic/react";



import {Enchere} from "../../../models/Enchere";
import "./Enchere.css";

const ListeEnchere: React.FC = () => {
  const pageRef = useRef<HTMLElement>(null);
  const [encheres , setEncheres] = useState<Enchere[]>([]);

  const getEncheres = async() =>{
    const user = localStorage.getItem("user");
    try {
      const response = await fetch('https://api-enchere-production.up.railway.app/encheres/mine/'+user);
      if (!response.ok) {
          throw Error(response.statusText)
      }
      const json = await response.json()
      setEncheres(json);
      } catch (error) {
          console.error(error)
      }
    }

    useEffect (() => {
      getEncheres();
    }, []);

  return (
    <IonPage ref={pageRef} id="schedule-page main">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot='start'>
              <IonMenuButton/>
            </IonButtons>

            <IonTitle>Liste Enchere</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} class="main">
      {encheres.map((enchere) =>
      <IonCard className="speaker-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="speaker-item">
            <IonLabel>
            <h2>{enchere.nom}</h2>
            <br />
            <img className="imageSmall" src="assets/img/appicon.svg" alt="Ionic logo" />

            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>Mise Depart: {enchere.prixMinimal}</p>
              <p>Publié le {enchere.dateDebut}</p>
            </IonLabel>
          </IonItem>

        </IonCardHeader>
      </IonCard>

      )
      }
      </IonContent>

    </IonPage>
  );
};

export default ListeEnchere;

import React, { useState, useRef, useEffect } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonButton,
  IonHeader,
  IonCol,
  IonRow,
  IonItem,
  IonLabel,
  IonList,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";

import "./Enchere.css";

import { Categorie } from "../../../models/Categorie";
import { useHistory } from "react-router";


const AjoutEnchere: React.FC = () => {
  const [categories , setCategories] = useState<Categorie[]>([]);
  const [nom,setNom] = useState('');
  const [descri,setDescri] = useState('');
  const [id_categorie, setIdCategorie] = useState();
  const [dure, setDure] = useState('');
  const [prix_minimal, setPrixMinimal] = useState('');

  const pageRef = useRef<HTMLElement>(null);

  const getCategories = async() => {
    try {
        const response = await fetch('https://api-enchere-production.up.railway.app/categories');
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const json = await response.json()
        setCategories(json);
    } catch (error) {
        console.error(error)
    }
}
const history  = useHistory();

  const send = async() => {
    console.log("tafiditra");

    const url = 'https://api-enchere-production.up.railway.app/encheres/insertion';
    const data = {
      nom : nom,
      descri : descri,
      categorie : id_categorie ,
      utilisateur : {
          id_utilisateur : localStorage.getItem("user")
      },
      prixMinimal : parseInt(prix_minimal),
      dure: parseInt(dure)
    }
    try {
      console.log(data);

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
        console.log(error);

    }
  }
useEffect(() => {
    getCategories();
},[]);

  return (
    <IonPage ref={pageRef} id="schedule-page main">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Ajouter Enchere</IonTitle>
        </IonToolbar>
      </IonHeader>
      <br /><br /><br /><br />
      <IonContent fullscreen={true} class="main">
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Nom Lot
              </IonLabel>
              <IonInput name="nom" type="text" value={nom} onIonChange={e => setNom(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Description
              </IonLabel>
              <IonTextarea name="descri" value={descri} onIonChange={e => setDescri(e.detail.value!)}></IonTextarea>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Categorie
              </IonLabel>
              <IonSelect interface="popover" placeholder="Select categories" name="categorie" onIonChange={e => setIdCategorie(e.detail.value)}>
              {categories.map((categorie) =>
                <IonSelectOption value={categorie}>{categorie.intitule}</IonSelectOption>
              )}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Duree
              </IonLabel>
              <IonInput name="dure" type="number" value={dure} onIonChange = {e => setDure(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">
                Prix
              </IonLabel>
              <IonInput name="prix_minimal" type="number" value = {prix_minimal} onIonChange = {e => setPrixMinimal(e.detail.value!)}></IonInput>
            </IonItem>

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block" onClick={send}>Ajouter</IonButton>
            </IonCol>
          </IonRow>
      </IonContent>
    </IonPage>
  );
};


export default AjoutEnchere;
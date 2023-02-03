import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput } from '@ionic/react';
import './Login.css';
import { useHistory } from "react-router";

const Login: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history  = useHistory();

  const login = async() => {
    const data = {email : username , mdp : password}
    const url = 'https://api-enchere-production.up.railway.app/utilisateurs/login';
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
      const json = await response.json();
      localStorage.setItem("user", json.id_utilisateur);
      history.push("/ListeEnchere");
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <IonPage id="login-page main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">

          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/j.jpg" alt="Ionic logo" />
        </div>

          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value='michaeljohnson@email.com' spellCheck={false} autocapitalize="off" placeholder='michaeljohnson@email.com'
                  onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value='password' onIonChange={e => setPassword(e.detail.value!)} placeholder='password'>
              </IonInput>
            </IonItem>

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block" onClick={login}>Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>

      </IonContent>

    </IonPage>
  );
};

export default Login;

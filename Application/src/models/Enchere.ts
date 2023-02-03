import { Categorie } from "./Categorie";
import { Image } from "./Image";

export interface Enchere {
  id : number ;
  nom? : string ;
  desri? : string ;
  categorie : Categorie;
  images : Image[];
  dateDebut : string;
  dure : number;
  statut : boolean;
  prixMinimal : number;
}

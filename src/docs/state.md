# Etat global de l'application

|Nom |Type|Description|Commentaires|
|-|-|-|-|-|
|cards| Card []| tableau contenant nos cartes|
|currentCount|Number|nombre de cartes jouées au tour  actuel| doit etre égal 2 maxi et remis à zéro ensuite
|pairs|Number|nombres de paires de cartes jouées en tout| permet de finir la partie si le joueur a gagné
|difficulty|String|difficulté du jeu|

## Type Card 

|Nom |Type|Description|Commentaires|
|-|-|-|-|-|
|id|Number|identifiant de la carte||
|fruit|string|nom du fruit porté par la carte||
|style|string|style css pour afficher le fruit|tous les fruits sont sur une seule image et on utilise la technique des sprites pour les afficher|
|playable|boolean|indique si la carte est jouable|

## Middleware

- pour chaque carte jouée vérifier si elle fait partie de la même paire. Si oui la laisser face fruit et la rendre non-jouable sinon la retourner au bout d'une seconde
-
# AxelFayet_6_23032022

<h1>P6 PIIQUANTE</h1>
  <p>Bienvenue sur le repo contenant le serveur du site en développement Piiquante !</p>
<h2>Pré-requis et technologies utilisées</h2>
  <p>Ce serveur à été développé à l'aide de JavaScript. Il utilise <a href="https://nodejs.org/">Node.js</a> et son infrastructure <a href="https://expressjs.com/fr/">Express</a> pour fonctionner.
  La base de données utilisée pour la phase de développement est hébergée sur <a href="https://www.mongodb.com/">MongoDB Atlas</a> et est géré avec la bibliothèque de programmation <a href="https://mongoosejs.com/">Mongoose</a>.</p>
<h3>Installation du backend</h3>
	<em>Node est nécéssaire au fonctionnement de l'application, pour l'installer, rendes-vous <a href="https://nodejs.org/en/download/">ici</a></em>
  <p>Tout d'abord, clonez ce repo en local sur votre machine, puis à partir de votre éditeur de code rendez vous dans le dossier cloné pour y effectuer
	l'installation en saisissant <code>npm install</code></p>
	<p><strong>Le dossier "Images" étant ignoré lors de l'envoi sur github, il vous faudra le créer à la racine du dossier backend</strong></p>
	<p><strong>Avant de lancer le serveur</strong> il vous faudra créer votre propre fichier <code>.env</code> à la racine du dossier backend. Vous pouvez pour cela suivre l'exemple du fichier .env-type situé lui aussi à la racine du repo.</p>
	<p>Une fois votre fichier .env correctement paramétré vous pourrez lancer le serveur à l'aide de la commande <code>nodemon server</code></p>
	<strong><em>Par défaut le serveur utilisera le port 3000</em></strong>
<h3>Installation du frontend</h3>
	<p>Le repo du frontend se situe <a href="https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6">ici</a>. Il vous suffit de le cloner sur votre machine <strong>en dehors du backend que vous venez de paramétrer</strong></p>
	<p>Le frontend requiers <strong>Angular Cli</strong> pour fonctionner. Pour l'installer, il suffit d'effectuer un <code>npm i @angular/cli</code> à la racine du dossier cloné (Vous pouvez consulter la documentation <a href="https://angular.io/cli">ici</a>)</p>
	<p>Ensuite, installer les dépendances du frontend en effectuant un <code>npm install</code> à la racine du dossier frontend.</p>
	<p>Enfin, lancer la commande <code>ng serve</code> ou <code>npm start</code> afin de démarrer le serveur frontend. Par défaut, il se lancera sur le port <a href="http://localhost:4200">4200</a> de votre machine.</p>
	<strong><em>Lors de l'installation des dépendances, la console peut vous signaler des vulnérabilités. Il est recommander de lancer la commande <code>npm audit fix</code> afin d'assurer le bon fonctionnement du serveur et du frontend</em></strong>


<p>Pour toutes questions, vous pouvez me contacter dirctement via mon adresse <a href="mailto:axel.fayet97@gmail.com">mail</a>.</p>

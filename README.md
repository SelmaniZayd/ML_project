# ML_project
Une petite documentation du projet a été rédiger sur le document documentation.pdf

Commencer par :
- Créer votre venv
* * "py -3.8 -m venv venv"
* * "venv\Scripts\activate"
- * "pip install -r requirements.txt"

## Pour lancer les notebook
- "juptyer notebook"
- naviguez dans le répertoire jupyter et vous trouverez les notebooks

## lancer l'application web

### lancer le back
- naviguer dans /web/back puis lancez les commandes
* * set FLASK_APP=app.py
* * set FLASK_ENV=Development
* * set FLASK_DEBUG=1
* * flask run
- * le serveur sera hoster sur localhost:5000

### lancer le front
- naviguer dans /web/front puis lancez le commande "npm install && npm start"
- le serveur sera hoster sur localhost:3000

# RESULATS
CNN from scratch => 34%
Transfer Learning => 62%
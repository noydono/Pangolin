# Pangolin
test technique


## Project setup
exécuté setup.bash
dans le dossier où il se trouve
### l'installation d'angular material
Selection le theme que vous voulez  et dit oui à la typo et animation =) 
```
bash setup.bash

```
### Modifier .env
Rajouté dans .env
et remplacé <db_name>
```
PORT = 8080
MONGOURL = "mongodb://localhost:27017/<db_name>"
USERSECRET = ILOVEPANGOLIN

```


### Compiles and hot-reloads for development
npm start dans le dossier back et front
```
npm start

```

### Compiles and minifies for production
```
npm run build

```
### Test Back
#### Pour Lancé les test fait attention que .env soit sur une DB de TEST
Dans le fichier coverage vous pouvez ouvrir index.html pour voir le coverage de chaque fichier

```
npm test

```

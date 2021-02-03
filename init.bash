#Init Projet
sudo apt update
sudo apt upgrade
apt install figlet
nodejs=$(node -v)
ng=$(ng --version)
mongod=$(mongod -v)
screen=$(screen --version)
errors=()
clear
figlet "INIT PROJET"
figlet "check dependency"
#je verifie que nodejs et bien installé
if [[ -n ${nodejs} ]]; then
	echo NODE OK
else
	echo NODE MISSING
	errors+=("NODEJs")
fi

# je veriffier que angular/cli et bien installé
if [[ -n ${ng} ]]; then
	echo ANGULAR Ok
else
	echo NG MISSING
	errors+=("ANGULAR/CLI")
fi

#je verifier que mongod et bien installé
if [[ -n  ${mongod} ]]; then
	echo MONGOD OK
else
	echo MONGO MISSING
	errors+=("MONGOD")
fi

#Je verifie qu'il n'y a pas d'error sinon j'affiche les errors
if [[ ${errors[@]} > 0 ]]; then
	figlet "ERRORS"
	for i in errors
	do
		echo "ERREUR VEULLER INSTALLER"
		echo "-${errors}"
	done
fi

#install de screen si besoin pour lancer mongod en arriere plan
if [[ -n ${screen} ]]; then
	echo SCREEN OK
else
	sudo apt update
	sudo apt install screen
fi
figlet "angular init"
#INIT ANGULAR
ng analytics off
ng new front --routing --style=css --strict=false
cd front
ng g s services/auth
ng g s services/friend
ng g s services/tokenStorage
ng g c components/friend
ng g c components/login
ng g c components/profile
ng g c components/register
ng g guard guard/login
ng g guard guard/profil
ng add @angular/material
ng generate @angular/material:navigation services/nav
ng generate @angular/material:dashboard services/home
cd ../
figlet "nodejs init"
mkdir back
cd back
npm init -y
touch server.js
npm i express mongoose body-parser cors method-override faker jsonwebtoken bcrypt
npm i --save-dev nodemon chai chai-http mocha dotenv nyc
touch .env
mkdir app
mkdir test
touch ./test/crud.test.js
cd app 
mkdir controllers middleware models
touch controllers/userControllers.js middleware/userValidator.js models/UserModel.js
touch router.js
figlet "ready to code in mean"

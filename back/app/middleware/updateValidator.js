"use strict";

module.exports = (req,res,next) => {
    let hasErrors = false;
    let errors = [];
    
    ageValidator(req.body.age)
    raceValidator(req.body.race)
    foodValidator(req.body.food)
    familleValidator(req.body.famille)
    
    if(hasErrors === true){
      res.status(422).json({
        errors: errors,
      });
    }else{
      next()
    }

    function ageValidator(age){
      const patternAge = /^[0-9]+$/ ;
      if(!age){
        
      }else if (patternAge.test(age) === false) {
        errors.push({ age: "Age non valide" });
        hasErrors = true;
      }
    };
    function raceValidator(race){
      const patternRace = /^([a-zA-Z0-9-_]{3,36})$/;
      if(!race){
      }
      else if (patternRace.test(race) === false) {
        errors.push({ race: "Espece non valide" });
        hasErrors = true;
      }
    };
    function foodValidator(food){
      const patternFood = /^([a-zA-Z0-9-_]{4,36})$/;
      if(!food){
        
      }else if (patternFood.test(food) === false) {
        errors.push({ food: "Nourriture non valide" });
        hasErrors = true;
      }
    };

    function familleValidator(famille){
      const patternFamille = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
      if(!famille){
        
      }else if(patternFamille.test(famille) === false) {
        errors.push({ famille: "Famille non valide" });
        hasErrors = true;
      }
      
    };
    
    
   
    
};


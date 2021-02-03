const chai = require("chai");
const http = require("chai-http");
const expect = chai.expect;
const faker = require("faker");
const PangolinModel = require("../app/models/PangolinModel");
const bcrypt = require("bcrypt");

chai.use(http);

const app = require("../server");

describe("App", () => {
    it("Should exists", () => {
        expect(app).to.be.a("function");
    });
});

describe("User registration", () => {
    let new_user = {};


    afterEach(function (done) {
        PangolinModel.findOneAndDelete({
            username: new_user.username
        }, (err, user) => {
            if (err) {
                console.log(
                    "LogTest_UserRegistration: " + err);
            } else {
                new_user = {};
                done();
            }
        });
    });

    it("retourne 201 si l'utilisateur et persisté", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                console.log(res.body);
                expect(res).to.have.status(201);
                expect(res.body.errors).to.not.exist
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it("retourne 422 si l'email n'existe pas dans la db", (done) => {
        new_user = {
            username: "toto",
            email: "exist@exist.exi",
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                expect(res.body.errors[0].email).to.be.equal("L'email existe déjà")
                done();
            })
            .catch((err) => {
                console.log(err);
            })
    })

    it("retourne 422 si username n'est pas valide", (done) => {
        new_user = {
            username: "a",
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si email n'est pas valide", (done) => {
        new_user = {
            username: "toto",
            email: "aaaaa",
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si le password n'est pas valide", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodk",
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };;
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si age n'est pas valide", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            age: "azea",
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la race n'est pas valide", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "m<",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la food n'est pas valide", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "malais",
            food: "fo<>",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la famille n'est pas valide", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "<>script"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it("retourne 422 si la username n'est pas existant", (done) => {
        new_user = {
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                expect(res.body.errors[0].username).to.be.equal("Le pseudo et requis")
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la email n'est pas existant", (done) => {
        new_user = {
            username: "toto",
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                expect(res.body.errors[0].email).to.be.equal("L'email et requis")
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la password n'est pas existant", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                expect(res.body.errors[0].password).to.be.equal("Le password et requis")
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la age n'est pas existant", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                expect(res.body.errors[0].age).to.be.equal("L'age et requis")
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la race n'est pas existant", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodkengM*",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                expect(res.body.errors[0].race).to.be.equal("L'espèce et requis")
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la food n'est pas existant", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "malais",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                expect(res.body.errors[0].food).to.be.equal("La nourriture et requis")
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la famille n'est pas existant", (done) => {
        new_user = {
            username: "toto",
            email: faker.internet.email(),
            password: "1zodkengM*",
            race: "malais",
            food: "fourmis",
            age: 1
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                expect(res.body.errors[0].famille).to.be.equal("La famille et requis")
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it("retourne 422 si deux ne pas valide", (done) => {
        new_user = {
            username: "toto",
            race: "malais",
            food: "fourmis",
            age: 1,
            famille: "#fff"
        };
        chai
            .request(app)
            .post("/api/register")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(2);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

});

describe("User login", () => {
    let new_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*",
    };

    beforeEach(function (done) {
        const user = new PangolinModel(new_user);
        user.save((err, user_saved) => {
            if (err) {
                console.log(
                    "LogTest_UserUpdate: erreur de creation d'utilisateur" + err
                );
            } else {
                new_user._id = user_saved._id
                done();
            }
        });
        user.generateAuthToken()
    });

    afterEach(function (done) {
        PangolinModel.findOneAndDelete({
            username: new_user.username
        }, (err, user) => {
            if (err) {
                console.log(
                    "LogTest_UserRegistration: " + err);
            } else {
                new_user = {
                    username: faker.name.firstName(),
                    email: "noydono.dev.spam@gmail.com",
                    password: faker.internet.password() + "1M*",
                }
                done();
            }
        });
    });

    it("retourne 200 si les credentials sont valide", (done) => {
        chai
            .request(app)
            .post("/api/login")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body.token).to.exist;
                expect(res.body.pangolin._id).to.be.equal(`${new_user._id}`)
                done();
            })
            .catch((err) => {
                console.log(err);
            })
    });

    it("retourne 422 si l'email n'est pas valide", (done) => {
        new_user.email = "ea ";
        chai
            .request(app)
            .post("/api/login")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            })
    })

    it("retourne 422 si l'email n'est pas existant", (done) => {
        let credential = {
            password: faker.internet.password() + "1M*"
        }

        chai
            .request(app)
            .post("/api/login")
            .send(credential)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            })
    })

    it("retourne 422 si l'email n'existe pas dans la db", (done) => {
        new_user.email = "toto@toto.toto";
        chai
            .request(app)
            .post("/api/login")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                expect(res.body.errors[0].email).to.be.equal("L'email n'est pas existante")
                done();
            })
            .catch((err) => {
                console.log(err);
            })
    })

    it("retourne 422 si le password ne match pas", (done) => {
        new_user.password = "Toto1234*"
        chai
            .request(app)
            .post("/api/login")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            })
    })

    it("retourne 422 si le password n'est pas valid", (done) => {
        new_user.password = "toto";

        chai
            .request(app)
            .post("/api/login")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            })
    })

    it("retourne 422 si le password n'est pas existant", (done) => {
        let credential = {
            email: "noydono.dev.spam@gmail.com",
        }

        chai
            .request(app)
            .post("/api/login")
            .send(credential)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            })
    })
})

describe("User Update", () => {

    const old_user = {
        username: "toto",
        email: faker.internet.email(),
        password: "1zodkengM*",
        race: "malais",
        food: "fourmis",
        age: 1,
        famille: "#fff"
    };
    let new_user = {};

    beforeEach(function (done) {
        PangolinModel.create(old_user, (err, user) => {
            if (err) {
                console.log(
                    "LogTest_UserUpdate: erreur de creation d'utilisateur" + err
                );
            } else {
                new_user._id = user._id;
                done();
            }
        });
    });

    afterEach(function (done) {
        PangolinModel.findOneAndDelete({
            _id: new_user._id
        }, (err) => {
            if (err) {
                console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
            } else {
                new_user = {}
                done();
            }
        });
    });

    it("retourne 200 si les data sont valide et persisté", (done) => {

        new_user.race = "cap"
        new_user.food = "termites"
        new_user.age = 12
        new_user.famille = "#ff1"

        chai
            .request(app)
            .put("/api/update/" + new_user._id)
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body.race).to.be.equal(new_user.race)
                expect(res.body.food).to.be.equal(new_user.food)
                expect(res.body.age).to.be.equal(new_user.age)
                expect(res.body.famille).to.be.equal(new_user.famille)
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it("retourne 422 si l'utilisater n'est pas trouver", (done) => {
        new_user.race = "cap"
        new_user.food = "termites"
        new_user.age = 12
        new_user.famille = "#ff1"
        chai
            .request(app)
            .put("/api/update/123")
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors[0].update).to.be.equal("Pangolin introuvable");
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it("retourne 422 si age n'est pas valide", (done) => {
        new_user.race = "cap"
        new_user.food = "termites"
        new_user.age = "saa44"
        new_user.famille = "#ff1"

        chai
            .request(app)
            .put("/api/update/" + new_user._id)
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la race n'est pas valide", (done) => {
        new_user.race = "<>"
        new_user.food = "termites"
        new_user.age = 12
        new_user.famille = "#ff1"

        chai
            .request(app)
            .put("/api/update/" + new_user._id)
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la food n'est pas valide", (done) => {
        new_user.race = "cap"
        new_user.food = "te>>"
        new_user.age = 12
        new_user.famille = "#ff1"

        chai
            .request(app)
            .put("/api/update/" + new_user._id)
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it("retourne 422 si la famille n'est pas valide", (done) => {
        new_user.race = "cap"
        new_user.food = "termites"
        new_user.age = 12
        new_user.famille = "<>"

        chai
            .request(app)
            .put("/api/update/" + new_user._id)
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors.length).to.be.equal(1);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

});

describe("User Delete", () => {
    let new_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*",
    };

    beforeEach(function (done) {
        PangolinModel.create(new_user, (err, user) => {
            if (err) {
                console.log(
                    "LogTest_UserUpdate: erreur de creation d'utilisateur" + err
                );
            } else {

                new_user._id = user._id;
                done();
            }
        });
    });

    afterEach(function (done) {
        PangolinModel.findOneAndDelete({
            _id: new_user._id
        }, (err) => {
            if (err) {
                console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
            } else {
                new_user = {
                    username: faker.name.firstName(),
                    email: faker.internet.email(),
                    password: faker.internet.password() + "1M*",
                };
                done();
            }
        });
    });

    it("retourn 200 si l'utilisateur et supprimé", (done) => {

        chai
            .request(app)
            .delete("/api/delete/" + new_user._id)
            .send()
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body.errors).to.not.exist
                expect(`${new_user._id}`).to.be.equal(res.body._id)
                done()
            }).catch((err) => {
                console.log(err)
            })
    })

    it("retourne 422 si l'utilisateur n'est pas trouver", (done) => {
        chai
            .request(app)
            .delete("/api/delete/123")
            .send()
            .then((res) => {
                expect(res).to.have.status(422);
                expect(res.body.errors[0].delete).to.be.equal("Pangolin introuvable");
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    //je voudrais rajoute un check de id mongoose qui doit un 
    // hex de 24 charctere pour que findByIdAndDelete renvoie q'une erreur

})

describe("AddFriend", () => {

    let first_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*",
        race: "malais",
        food: "fourmis",
        age: 1,
        famille: "#fff"
    };
    let second_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*",
        race: "malais",
        food: "fourmis",
        age: 1,
        famille: "#fff"
    };

    beforeEach(function (done) {
        PangolinModel.create(first_user, (err, user) => {
            if (err) {
                console.log(
                    "LogTest_UserUpdate: erreur de creation d'utilisateur" + err
                );
            } else {
                first_user._id = user._id;
                PangolinModel.create(second_user, (err, user) => {
                    if (err) {
                        console.log(
                            "LogTest_UserUpdate: erreur de creation d'utilisateur" + err
                        );
                    } else {
                        second_user._id = user._id;
                        done()
                    }
                });
            }
        });

    });

    afterEach(function (done) {

        PangolinModel.findOneAndDelete({
            _id: first_user._id
        }, (err) => {
            if (err) {
                console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
            } else {
                first_user = {
                    username: faker.name.firstName(),
                    email: faker.internet.email(),
                    password: faker.internet.password() + "1M*"
                };
                PangolinModel.findOneAndDelete({
                    _id: second_user._id
                }, (err) => {
                    if (err) {
                        console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
                    } else {
                        new_user = {
                            username: faker.name.firstName(),
                            email: faker.internet.email(),
                            password: faker.internet.password() + "1M*"
                        };
                        done();
                    }
                });
            }
        });

    });

    it("retourn 200 si l'ami et ajouté", (done) => {

        chai
            .request(app)
            .post("/api/friend/" + first_user._id)
            .send({
                _id: second_user._id,
                username: second_user.username
            })
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body.errors).to.not.exist
                done()
            }).catch((err) => {
                console.log(err);
            })
    })
    it("retourn 422 si l'une des id n'est pas correct", (done) => {

        chai
            .request(app)
            .post("/api/friend/123")
            .send({
                _id: second_user._id,
                username: second_user.username
            })
            .then((res) => {
                expect(res).to.have.status(422)
                expect(res.body.errors.length).to.be.equal(1)
                expect(res.body.errors[0].addFriend).to.be.equal("l'une ou les deux id ne sont pas correct")
                done()
            }).catch((err) => {
                console.log(err);
            })
    })
    it("retourn 422 si les deux id n'est pas correct", (done) => {

        chai
            .request(app)
            .post("/api/friend/123")
            .send({
                _id: "123"
            })
            .then((res) => {
                expect(res).to.have.status(422)
                expect(res.body.errors.length).to.be.equal(1)
                expect(res.body.errors[0].addFriend).to.be.equal("l'une ou les deux id ne sont pas correct")
                done()
            }).catch((err) => {
                console.log(err);
            })
    })

})

describe("Delete Friend", () => {
    let first_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*",
        race: "malais",
        food: "fourmis",
        age: 1,
        famille: "#fff"
    };
    let second_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*",
        race: "malais",
        food: "fourmis",
        age: 1,
        famille: "#fff"
    };

    beforeEach(function (done) {
        PangolinModel.create(first_user, (err, user) => {
            if (err) {
                console.log(
                    "LogTest_FriendUpdate: Err beforeEach" + err
                );
            } else {
                first_user._id = user._id;

                PangolinModel.create(second_user, (err, user) => {
                    if (err) {
                        console.log(
                            "LogTest_FriendUpdate: Err beforeEach" + err
                        );
                    } else {
                        second_user._id = user._id;

                        PangolinModel.findByIdAndUpdate(first_user._id, {
                            $push: {
                                friends: {
                                    _id: second_user._id,
                                    _username: second_user.username,
                                }
                            }
                        }, {
                            new: true,
                        }, (err, pangolin) => {
                            if (!err) {
                                done()
                            } else {
                                console.log(err)
                            }
                        })
                    }
                });
            }
        });


    });

    afterEach(function (done) {
        PangolinModel.findOneAndDelete({
            _id: first_user._id
        }, (err) => {
            if (err) {
                console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
            } else {

                first_user = {
                    username: faker.name.firstName(),
                    email: faker.internet.email(),
                    password: faker.internet.password() + "1M*",
                    race: "malais",
                    food: "fourmis",
                    age: 1,
                    famille: "#fff"
                };
                PangolinModel.findOneAndDelete({
                    _id: second_user._id
                }, (err) => {
                    if (err) {
                        console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
                    } else {
                        second_user = {
                            username: faker.name.firstName(),
                            email: faker.internet.email(),
                            password: faker.internet.password() + "1M*",
                            race: "malais",
                            food: "fourmis",
                            age: 1,
                            famille: "#fff"
                        };
                        done();
                    }
                });
            }
        });

    });

    it("retourn 200 si l'ami et suprimé", (done) => {

        chai
            .request(app)
            .put("/api/friend/" + first_user._id)
            .send({
                _id: second_user._id,
                username: second_user.username
            })
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body.friends).to.be.not.contain(`${second_user._id}`)
                done()
            }).catch((err) => {
                console.log(err);
            })
    })

    it("retourn 422 si l'une des id n'est pas correct", (done) => {

        chai
            .request(app)
            .put("/api/friend/123")
            .send({
                _id: second_user._id,
                username: second_user.username
            })
            .then((res) => {
                expect(res).to.have.status(422)
                expect(res.body.errors.length).to.be.equal(1)
                expect(res.body.errors[0].removeFriend).to.be.equal("l'une ou les deux id ne sont pas correct")
                done()
            }).catch((err) => {
                console.log(err);
            })
    })
    it("retourn 422 si les deux id n'est pas correct", (done) => {

        chai
            .request(app)
            .put("/api/friend/123")
            .send({
                _id: "123"
            })
            .then((res) => {
                expect(res).to.have.status(422)
                expect(res.body.errors.length).to.be.equal(1)
                expect(res.body.errors[0].removeFriend).to.be.equal("l'une ou les deux id ne sont pas correct")
                done()
            }).catch((err) => {
                console.log(err);
            })
    })

})

describe("GetAllUser", () => {
    let first_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*"
    };
    let second_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*"
    };

    beforeEach(function (done) {
        PangolinModel.create(first_user, (err, user) => {
            if (err) {
                console.log(
                    "LogTest_FriendUpdate: Err beforeEach" + err
                );
            } else {
                first_user._id = user._id;

                PangolinModel.create(second_user, (err, user) => {
                    if (err) {
                        console.log(
                            "LogTest_FriendUpdate: Err beforeEach" + err
                        );
                    } else {
                        second_user._id = user._id;
                        done()
                    }
                });
            }
        });


    });

    afterEach(function (done) {
        PangolinModel.findOneAndDelete({
            _id: first_user._id
        }, (err) => {
            if (err) {
                console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
            } else {

                first_user = {
                    username: faker.name.firstName(),
                    email: faker.internet.email(),
                    password: faker.internet.password() + "1M*"
                };
                PangolinModel.findOneAndDelete({
                    _id: second_user._id
                }, (err) => {
                    if (err) {
                        console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
                    } else {
                        second_user = {
                            username: faker.name.firstName(),
                            email: faker.internet.email(),
                            password: faker.internet.password() + "1M*"
                        };
                        done();
                    }
                });
            }
        });

    });

    it("retourn 200 avec tout les utilisateur", (done) => {

        chai
            .request(app)
            .get("/api/friend")
            .send()
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.lengthOf.above(0)
                done()
            }).catch((err) => {
                console.log(err);
            })
    })
})

describe("GetByIdAndretournFriend", () => {
    let first_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*"
    };
    let second_user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password() + "1M*"
    };

    beforeEach(function (done) {
        PangolinModel.create(first_user, (err, user) => {
            if (err) {
                console.log(
                    "LogTest_FriendUpdate: Err beforeEach" + err
                );
            } else {
                first_user._id = user._id;

                PangolinModel.create(second_user, (err, user) => {
                    if (err) {
                        console.log(
                            "LogTest_FriendUpdate: Err beforeEach" + err
                        );
                    } else {
                        second_user._id = user._id;
                        PangolinModel.findByIdAndUpdate(second_user._id, {
                            $push: {
                                friends: first_user._id
                            }
                        }, {
                            new: true,
                        }, (err, pangolin) => {
                            if (!err) {
                                PangolinModel.findByIdAndUpdate(first_user._id, {
                                    $push: {
                                        friends: second_user._id
                                    }
                                }, {
                                    new: true,
                                }, (err, pangolin) => {
                                    if (!err) {
                                        done()
                                    } else {
                                        console.log(err)
                                    }
                                })
                            } else {
                                console.log(err)
                            }
                        })


                    }
                });
            }
        });


    });

    afterEach(function (done) {
        PangolinModel.findOneAndDelete({
            _id: first_user._id
        }, (err) => {
            if (err) {
                console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
            } else {

                first_user = {
                    username: faker.name.firstName(),
                    email: faker.internet.email(),
                    password: faker.internet.password() + "1M*"
                };
                PangolinModel.findOneAndDelete({
                    _id: second_user._id
                }, (err) => {
                    if (err) {
                        console.log("LogTest_UserUpdate: erreur de suppresion d'utilisateur");
                    } else {
                        second_user = {
                            username: faker.name.firstName(),
                            email: faker.internet.email(),
                            password: faker.internet.password() + "1M*"
                        };
                        done();
                    }
                });
            }
        });

    });

    it("retourn 200 et retroun les amis de user", (done) => {

        chai
            .request(app)
            .get("/api/friend/" + first_user._id)
            .send({
                _id: second_user._id
            })
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body.friends).to.be.exist
                done()
            }).catch((err) => {
                console.log(err);
            })
    })

    it("retourn 422 si l'une des id n'est pas correct", (done) => {

        chai
            .request(app)
            .get("/api/friend/123")
            .send({
                _id: second_user._id
            })
            .then((res) => {
                expect(res).to.have.status(422)
                expect(res.body.errors.length).to.be.equal(1)
                expect(res.body.errors[0].getFriend).to.be.equal("l'une ou les deux id ne sont pas correct")
                done()
            }).catch((err) => {
                console.log(err);
            })
    })

    it("retourn 422 si les deux id n'est pas correct", (done) => {

        chai
            .request(app)
            .get("/api/friend/123")
            .send({
                _id: "123"
            })
            .then((res) => {
                expect(res).to.have.status(422)
                expect(res.body.errors.length).to.be.equal(1)
                expect(res.body.errors[0].getFriend).to.be.equal("l'une ou les deux id ne sont pas correct")
                done()
            }).catch((err) => {
                console.log(err);
            })
    })


})
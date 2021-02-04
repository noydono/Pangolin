const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Friend = mongoose.model('friends', mongoose.Schema({
    _id: String,
    username: String
}));
const pangolinSchema = mongoose.Schema({

    username: {
        type: String,
        required: [true, "Pseudo obligatoire"]
    },
    email: {
        type: String,
        required: [true, "Email obligatoire"]
    },
    password: {
        type: String
    },
    race: String,
    food: String,
    age: Number,
    famille: String,
    friends: [{
        type: Array,
        ref: 'Friend'
    }],
    isActive: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

pangolinSchema.pre('save', function (next) {
    if (this.password) {
        bcrypt.hash(this.password, 10, (err, encrypted) => {
            /* istanbul ignore if */
            if (err) {
                console.log("LogModelUserEncrytpePassword: " + err)
            }
            this.password = encrypted
            next()
        })
    } else {
        next()
    }
})

pangolinSchema.methods.generateAuthToken = async function () {
    const pangolin = this;
    const token = jwt.sign({
            _id: pangolin._id,
            username: pangolin.username,
            email: pangolin.email,
            created_at: pangolin.created_at,
        },
        process.env.USERSECRET, {
            expiresIn: '2h'
        });
    pangolin.tokens = pangolin.tokens.concat({
        token
    });
    return token;
};


pangolinSchema.statics.findByCredentials = async (email, password) => {

    let errors = []

    const pangolin = await Pangolin.findOne({
        email: email
    });
    if (!pangolin) {
        errors.push({
            email: "L'email n'est pas existante"
        });
        return {
            hasErrors: true,
            errors: errors
        };
    }

    const isPasswordMatch = await bcrypt.compare(password, pangolin.password);
    if (isPasswordMatch === false) {
        errors.push({
            password: "Password doesn't match"
        });
        return {
            hasErrors: true,
            errors: errors
        };
    }
    return pangolin;



};
const Pangolin = mongoose.model("Pangolin", pangolinSchema);
module.exports = Pangolin;
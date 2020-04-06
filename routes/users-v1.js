const express = require('express')
const router = express.Router()
const uuidv1 = require('uuid/v1')

//bdd des utilisateurs
const users = [
    {
        id: 'bac05824-6a8d-4d7a-a4e0-439fc5b19b73',
        name: 'Cleo Daguin',
        login: 'cleo',
        age: 22
    },
    {
        id: 'b9adada02-b882-4726-89df-89c66d64d68b',
        name: 'Julie Chapdelaine',
        login: 'julie',
        age:21
    }
]

//Afficher tous les utilisateurs
router.get('/', function(req,res,next) {
    res
        .status(200)
        .json(users)
})

//Afficher un utilisateur spécifique
router.get('/:userId', function(req,res,next) {
    const userId=req.params.id

    if(id){
        const usersFound = users.filter((user) => user.id ===id)
        if(usersFound.length === 1){
            res
                .status(200)
                .json(usersFound[0])
        }else{
            res
                .status(404)
                .json({message: "Pas d'utilisateur avec l'identifiant ${userId"})
        }

    }else{
        res
            .status(400)
            .json({message : "Mauvais parametre"})
    }
})

//Ajouter un utilisateur
router.post('/', function(req,res,next) {
    const utilisateur= req.body

    if(validateUser(utilisateur)){
        utilisateur.id= uuidv1()
        users.push(utilisateur)
        req 
            .res
            .status(201)
            .send(utilisateur)
    }else{
        res
            .status(400)
            .json({message: "Données de l'utilisateur non valides"})
    }
})


//Mettre à jour un utilisateur
router.patch('/:userId', function(req,res,next) {
    const userId=req.params.id
    const nouvelUProp = req.body

    if(userId && nouvelUProp){
        const userFound=users.filter((user)=>user.id === userId)

        if(usersFound.length===1){
            const vieilU=userFound[0]

            const nouvelU={
                ...vieilU,
                ...nouvelUProp
            }

            if(validUser(nouvelU)){
                Object.assign(vieilU, nouvelU)
                res
                    .status(200)
                    .json(nouvelU)
            }else{
                res
                    .status(400)
                    .json({message : "Paramètres invalides"})
            }
        }else{
            res
                .status(404)
                .json({message : "Aucun utilisateur avec l'identifiant ${userId}"})
        }
    }else{
        res
            .status(400)
            .json({message : "Mauvais paramètres"})
    }
})

//Supprimer un utilisateur
router.delete('/:userId', function(req,res,next){
    const userId=req.param.id

    if(userId){
        const indexFound =users.findIndex((user) => user.id === userId)

        if(indexFound>-1){
            users.splice(indexFound,1)
            res
                .status(200)
                .end()
        }else{
            res
                .status(404)
                .json({message : "Aucun utilisateur navec l'identifiant ${userId}"})
        }
    }else{
        res
            .status(400)
            .json({message : "Mauvais paramètres"})
    }
})

function validateUser(user){
    let result = false
    if(user && user.id && user.login && user.name){
        result = true
    }
    return result
}

module.exports =router
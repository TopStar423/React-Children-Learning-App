import axios from "axios";

export default {
    // number game axios requests
    getNumberGame: function () {
        return axios.get("/api/numbergame");
    },

    // user axios requests
    postUsers: function (userData) {
        return axios.post("/register", userData)
            .then(function (response) {
                console.log('user has created a profile')
            })
            .catch(function (err) {
                console.log('sign up error')
                console.log(err)
            })
    },

    authenticate: function (username) {
        console.log(username)
        // console.log('succesfully hit API' + username)
        return axios.get("/login")
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (err) {
                console.log(err)
            })
    },

    login : function (username) {
        return axios.get('/login') 
        .then(function(response) {
            console.log(response)
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    // sendResults : function (score) {
    //     return axios.post('/api/games/colorgame')
    //     .then(function(response) {
    //         console.log('game score added')
    //     })
    //     .catch(function(err) {
    //         console.log(err)
    //     })
        
    // }
};
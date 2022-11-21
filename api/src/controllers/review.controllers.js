const {Review} = require("../db.js");

 async function postReview  (rev){
        
        try{
            if( !rev.star || !rev.coments) return  'Faltan datos obligatorios...';
        else{
            let createReview= {
                
                star:rev.star,
                coments:rev.coments,
               
            }
            let newReview = await Review.create(createReview);
            return newReview;
        }}catch(error){
            return error;
        }
    }

module.exports = {postReview}

 const { Router } = require('express');
const { postReview } = require('../controllers/review.controllers');
const router = Router();

router.post('/create', async (req, res) => {
  try {
   let newReview = await postReview(req.body);
   res.status(200).send(newReview);
  } catch (error) {
   res.status(400).send(error)
  }
})
 
module.exports = router;
const router = require('express').Router();
const User = require('../models/user.model');

// route the pages to show if there is any user in database then this block of code will show if haven't then it show 404 takes help of get request
router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:'+ err));
});

//  route the pages to add a new user to the database 
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error:'+ err));
});

//  route the pages to delete a user from the database by id
router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error:'+ err));
});

//  route the pages to update a user from the database by id
router.route('/update/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error:'+ err));
});

module.exports = router;

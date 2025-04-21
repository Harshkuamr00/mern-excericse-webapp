const router = require('express').Router();
const { response } = require('express');
const User = require('../models/user.model');


// route the pages to show if there is any user in database then this block of code will show if haven't then it show 404 takes help of get request
router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:'+ err));
});

//  route the pages to add a new user to the database 
router.post('/add', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Additional server-side validation
      if (!username || !email || !password) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }
  
      const newUser = new User({
        username, 
        email, 
        password
      });
  
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(400).json({ 
        message: error.message 
      });
    }
  });
  // update  the user name  or email address
  router.put('/update/:id', async (req, res) => {
    try {
      const { username, email } = req.body;
  
      const user = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (error) {
      res.status(400).json({ 
        message: error.message 
      });
    }
  });


    //  route the pages to delete a user from the database by id
router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error:'+ err));
});


module.exports = router;

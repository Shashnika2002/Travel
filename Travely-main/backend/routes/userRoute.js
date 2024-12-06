const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
} = require('firebase/auth');
const { auth, db } = require('../firebase.js');
const {
  addDoc,
  collection,
  limit,
  query,
  where,
  getDocs,
} = require('firebase/firestore');
const { isAuth, isAdmin, generateToken } = require('../utils.js');

// Create an Express router instance
const userRouter = express.Router();

// GET users (Admin only)
userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

// User sign-in route
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        const usersRef = collection(db, 'users');
        const q = query(
          usersRef,
          limit(1),
          where('userId', '==', userCredential.user.uid)
        );

        getDocs(q).then((querySnapshot) =>
          querySnapshot.forEach((doc) => {
            const refUser = doc.data();
            const user = {
              _id: refUser.userId,
              name: refUser.FullName,
              email: req.body.email,
              isAdmin: refUser.is_admin,
              password: req.body.password,
            };
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              password: user.password,
              token: generateToken(user),
            });
          })
        );
      })
      .catch((error) => {
        res.status(401).send({ message: 'Invalid email or password' });
      });
  })
);

// User sign-up route
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(async (userCredential) => {
        try {
          const FullName = req.body.name;
          await addDoc(collection(db, 'users'), {
            FullName,
            userId: `${userCredential.user.uid}`,
            is_admin: false,
          });

          const usersRef = collection(db, 'users');
          const q = query(
            usersRef,
            limit(1),
            where('userId', '==', userCredential.user.uid)
          );

          getDocs(q).then((querySnapshot) =>
            querySnapshot.forEach((doc) => {
              const refUser = doc.data();
              const user = {
                _id: refUser.userId,
                name: refUser.FullName,
                email: req.body.email,
                isAdmin: refUser.is_admin,
                password: req.body.password,
              };
              res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                password: user.password,
                token: generateToken(user),
              });
            })
          );
        } catch (e) {
          res.status(401).send({ message: e.message });
        }
      })
      .catch((err) => {
        res.status(401).send({ message: err.message });
      });
  })
);

// Update user password route
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.oldPassword)
      .then(() => {
        updatePassword(auth.currentUser, req.body.password)
          .then(() => {
            const usersRef = collection(db, 'users');
            const q = query(
              usersRef,
              limit(1),
              where('userId', '==', req.user._id)
            );

            getDocs(q).then((querySnapshot) =>
              querySnapshot.forEach((doc) => {
                const refUser = doc.data();
                const user = {
                  _id: refUser.userId,
                  name: refUser.FullName,
                  email: req.body.email,
                  isAdmin: refUser.is_admin,
                  password: req.body.password,
                };
                res.send({
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  password: user.password,
                  token: generateToken(user),
                });
              })
            );
          })
          .catch((error) => {
            res.status(401).send({ message: error.message });
          });
      })
      .catch((error) => {
        res.status(401).send({ message: error.message });
      });
  })
);

// Export the router
module.exports = userRouter;

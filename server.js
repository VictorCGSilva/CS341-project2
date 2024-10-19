const express = require ('express');
const mongodb = require ('./db/database');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
   .use(session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Accesss-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors({methods: ['GET','POST','DELETE','UPDATE','PUT','PATHC']}))
  .use(cors({origin: '*'}))
  .use('/', require('./routes/index'))
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}
));

passport.serializeUser((user, done)=>{
   done(null, user);
});

passport.deserializeUser((user, done)=>{
  done(null, user);
});

app.get('/', (req,res)=> {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged Out")
});

app.get('/github/callback', passport.authenticate('github', {failureRedirect: '/api-docs', session: false}),  (req,res)=> {
    req.session.user = req.user;
    res.redirect('/');
  });

process.on('uncaughtException', (err,origin)=> {
    console.log(process.stderr.fd, `Cought exception: ${err}\n` + `Exception origin: ${origin}`);
  } )

  mongodb.conectDB ((error)=>{
    if (error) {
        console.log(error);
    } else {
        app.listen(port, ()=> {
            console.log(`Server & Database is RUNNING on Port: ${port} `)
        })
    }
  })
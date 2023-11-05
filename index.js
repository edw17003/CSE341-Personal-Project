const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const exphbs = require('express-handlebars')

dotenv.config()
require('./config/passport')(passport)

const db = require('./models');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(session({ 
    secret: 'test', 
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI,}),
}))

const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

app.engine(
  '.hbs',
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

app.use(passport.initialize())
app.use(passport.session());



// Routes
app.use('/', require('./routes'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

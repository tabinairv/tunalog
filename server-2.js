const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const app = express();
const PORT= 3000;

//mongoDB connect
mongoose.connect('mongodb+srv://tabinairviana04:WVn3r%Azkm!6ZV7@cluster0.dqxg4.mongodb.net/prototipe-tunalog?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err));

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname,'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));


const store = new MongoDBStore({
  uri:'mongodb://localhost:27017/prototipe-tunalog',
  collection: 'session'
});

app.use(session({
  secret:'your-session-secret',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
})); 

const userSchema = new mongoose.Schema({
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true}
});
const User = mongoose.model('User', userSchema);

const logbookSchema = new mongoose.Schema({
  namaKapal: {type: String, required: true}, 
  namaPemilik: {type: String, required: true},
  nomorPerizinan: {type: String, required: true},
  transmiterSPKP: {type: String},
  tripKe: {type: String},
  jenisAPI: {type: String, required: true},
  grossTonage: {type: String, required: true},
  panjangKapal: {type: String},
  radioPanggil: {type: String},
  tandaPengenalKapal: {type: String, require: true},
  awakKapalWNI: {type: String},
  awakKapalWNA: {type: String},
  wppnri: {type: String},
  daerahPenangkapanIkan: {type: String, require: true},
  pelabuhanKeberangkatan: {type: String, require: true},
  pelabuhanKedatangan: {type: String, require: true},
  tanggalKeberangkatan: {type: String, require: true},  
  tanggalKedatangan: {type: String, require: true},
  lintang: {type: String},
  bujur: {type: String},
  jenisIkan: {type: String, require: true},
  jumlahEkor: {type: String, require: true},
  berat: {type: String, require: true},
}, {timestamps: true}
);
const Logbook = mongoose.model('Logbook', logbookSchema);

//autheticated useer middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated && req.session.userId) {
    next();
  } else {
    res.status(401).json({message: 'Unauthorized'});
  }
};

//guest middleware
const isGuest = (req, res, next) => {
  if (req.session.isGuest) {
    next();
  } else {
    res.status(401).json({ message: 'Guest access only' });
  }
};

//login route
app.post('/login', async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }
    if (password !== user.password){
      return res.status(400).json({message: 'Invalid password'});
    }

    req.session.isAuthenticated = true;
    req.session.userId = user._id;
    req.session.isGuest = false;
    console.log('Login succesful, session set:', req.session);
    res.json({message: 'Login Successful', userId: user._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error'});
  }
});

//guest login
app.post('/guest-login', async (req, res) => {
  req.session.isGuest = true;
  req.session.isAuthenticated = false; 
  req.session.userId = null; 
  console.log('Guest login successful, session set:', req.session);
  res.json({ message: 'Guest Login Successful' });
});

//logout
app.post('/logout', isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({message: 'Logout Failed'});
    }
    res.json({message: 'Logout Successful'});
  });
});

//logbook
app.post('/logbook', async (req, res) => {
  try {
    const { namaKapal, namaPemilik, nomorPerizinan, transmiterSPKP, tripKe, 
          jenisAPI, grossTonage, panjangKapal, radioPanggil, tandaPengenalKapal, awakKapalWNI, 
          awakKapalWNA, wppnri, daerahPenangkapanIkan, pelabuhanKeberangkatan, pelabuhanKedatangan, tanggalKeberangkatan,
          tanggalKedatangan, lintang, bujur, jenisIkan, jumlahEkor, berat } = req.body;
        const newLogbook = new Logbook({ namaKapal, namaPemilik, nomorPerizinan, transmiterSPKP, tripKe, 
          jenisAPI, grossTonage, panjangKapal, radioPanggil, tandaPengenalKapal, awakKapalWNI, 
          awakKapalWNA, wppnri, daerahPenangkapanIkan, pelabuhanKeberangkatan, pelabuhanKedatangan, tanggalKeberangkatan,
          tanggalKedatangan, lintang, bujur, jenisIkan, jumlahEkor, berat });
        await newLogbook.save();
        res.status(201).json({success: true, message:'Data berhasil dimasukan'});
      }
      catch (error) {    
        console.error("Error saat menyimpan data:", error);
        res.status(400).json({success: false,error: 'Data gagal dimasukan'});
  }
});
//realtime
app.get('/logbooks', async (req, res) => {
  try {
    const logbooks = await Logbook.find(); 
    res.status(200).json(logbooks);
  } catch (error) {
    console.error("Error saat mengambil data logbook:", error);
    res.status(500).json({ success: false, error: 'Gagal mengambil data logbook' });
  }
});

//dashboard
app.get('/guest-dashboard', isGuest, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'guest-dashboard.html'));
});
app.get('/dashboard', isAuthenticated, async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'))
});
app.get('/pelabuhan', isAuthenticated, async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pelabuhan.html'))
});
app.get('/report', isAuthenticated, async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'report.html'))
});
app.get('/api/dashboard/user', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user){
      return res.status(404).json({message: 'User not found'});
    }
    res.json({message: 'Welcome to User Dashboard', user});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error'});
  }
});
app.get('/realtime', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'realtime.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'log-in.html'))
})
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

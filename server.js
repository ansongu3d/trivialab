const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config()
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
};

const pg = require('pg')
const bcrypt = require('bcrypt');
const { expressSession, pgSession } = require('./session');
const { generateHash, isValidPassword } = require('./util/hash');


// app.use(express.json);
app.use(express.static('client/build'));
app.use(express.json());

const db = new pg.Pool({
  // database: "trivia_project",
  connectionString: process.env.DATABASE_URL || "trivia_project",
})

app.use(
  expressSession({
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true
  })
);



// login page 
app.post('/trivia/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email=$1';
  db.query(sql, [email]).then((db) => {
    if (
      db.rows.length === 0) {
      return res.status(400).json({ message: 'Sorry, Either the email and/or password you specified is incorrect.' });
    }
    const user = db.rows[0];

    const hashedPassword = user.password;

    if (isValidPassword(password, hashedPassword)) {
      req.session.email = email;
      return res.json({});
    }
    return res.status(400).json({ message: 'Email and/or password are incorrect.' });
  }).catch(err => {
    res.status(500).json({});
  })

});


// signup page 
app.post('/trivia/signup', (req, res) => {
  const { username, password, email } = req.body;

  // if (username === '' || password === '' || email === '') {
  //   return res.status(400).json({ message: 'Please Enter required data into the box below.' });
  // }

  const hashedPassword = generateHash(password)
  const sql = `INSERT INTO users(username, email, password) VALUES($1,$2,$3)`;

  db.query(sql, [username, email, hashedPassword]).then(() => {
    res.json({});
  }).catch((err) => {
    res.status(500).json({});
  });

})


app.get('/trivia/session', (req, res) => {
  const email = req.session.email;
  console.log(email)

  if (!email) {
    return res.status(401).json({ message: 'Currently Not logged In' });
  } else {
    return res.json({ email: email });
  }
});

app.post('/trivia/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email=$1';
  db.query(sql, [email]).then((db) => {
    if (
      db.rows.length === 0) {
      return res.status(400).json({ message: 'Sorry, Either the email and/or password you specified is incorrect.' });
    }
    const user = db.rows[0];
    const hashedPassword = user.password;

    if (isValidPassword(password, hashedPassword)) {
      req.session.email = email;
      return res.json({});
    }
    return res.status(400).json({ message: 'Email and/or password are incorrect.' });
  }).catch(err => {
    res.status(500).json({});
  })

});


// signup page 
app.post('/trivia/signup', (req, res) => {
  const { username, password, email } = req.body;
  // if (username === '' || password === '' || email === '') {
  //   return res.status(400).json({ message: 'Please Enter required data into the box below.' });
  // }

  const hashedPassword = generateHash(password)
  const sql = `INSERT INTO users(username, email, password) VALUES($1,$2,$3)`;
  db.query(sql, [username, email, hashedPassword]).then(() => {
    res.json({});
  }).catch((err) => {
    res.status(500).json({});
  });
})
// app.get('/trivia/session', (req, res) => {
//   const email = req.session.email;
//   if (!email) {
//     return res.status(401).json({ message: 'Currently Not logged In' });
//   } else {
//     return res.json({ email: email });
//   }
// });

app.post('/trivia/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to logout')
      } else {
        res.send('logout successful')
      }
    })
  } else {
    res.end()
  }
})

app.get('/trivia/quizzes', (req, res) => {
  console.log('hit trivia quitizz')
  const sql = `select * from trivias`
  db.query(sql, []).then((db, rows) => {
    const quizzes = {}
    // console.log(rows)
    for (const row of db.rows) {
      if (!quizzes[row.title]) {
        quizzes[row.title] = {
          title: row.title,
          category: row.category,
          questions: []
        }
      }

      const formattedQuestion = {
        questionText: row.question,
        answerOptions: [
          { answerText: row.answer, isCorrect: true },
          { answerText: row.fake_answer1, isCorrect: false },
          { answerText: row.fake_answer2, isCorrect: true },
          { answerText: row.fake_answer3, isCorrect: false },
        ],
      }

      formattedQuestion.answerOptions.sort(() => (Math.random() > .5) ? 1 : -1);



      quizzes[row.title].questions.push(formattedQuestion)
    }

    res.send(Object.values(quizzes))
  })
  .catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
})
// updating a new quiz into the database
app.put('/trivia_update/:id', (req, res) => {
  const update = req.params.id;
  const { category, title, picture, answer, fake_answer1, fake_answer2, fake_answer3 } = req.body

  if (category === "" || title === "" || picture === "" || fake_answer1 === "" || fake_answer2 === "" || fake_answer3 === "")
    return res.status(400).json({ message: 'Please ensure that the entire form has been filled in ' })
  const sql = `UPDATE trivias SET category=$1, title=$2, picture=$3, answer=$4, fake_answer1=$5, fake-answer2=$6, fake_answer3=$7 WHERE id=$8`;
  db.query(sql, [category, title, picture, answer, fake_answer1, fake_answer2, fake_answer3]).then((db) => {
    res.sendStatus(200)
  })
    .catch((err) => {
      res.sendStatus(500)
    })
})
// removing a trivia from the list 
app.delete('/trivia_removal/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM trivias WHERE id=$1`;
  db.query(query, [id]).then(() => {
    res.json({});
  })
    .catch((err) => {
      res.status(500).json({})
    })
})
// adding a new trivia to the database
app.post('/trivia_edit', (res, req) => {
  const { category, title, picture, answer, fake_answer1, fake_answer2, fake_answer3 } = req.body

  if (category === "" || title === "" || picture === "" || fake_answer1 === "" || fake_answer2 === "" || fake_answer3 === "")
    return res.status(400).json({ message: 'Please ensure that the entire form has been filled in ' })
  const sql = ` INSERT INTO trivias (category=$1, title=$2, picture=$3, answer=$4, fake_answer1=$5, fake-answer2=$6, fake_answer3=$7) `
  db.query(sql, [category, title, picture, answer, fake_answer1, fake_answer2, fake_answer3]).then((db) => {
    res.sendStatus(200)
  })
    .catch((err) => {
      res.status(500).json({})
    })
})

app.post('/trivia/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to logout')
      } else {
        res.send('logout successful')
      }
    })
  } else {
    res.end()
  }
})


// https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})



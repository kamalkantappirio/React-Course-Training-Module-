const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
const cors = require('cors');

app.use(cors());
const pg = require('pg');

const conString = "postgres://postgres:''@localhost:9000/postgres";

function connectWithServer() {
  const client = new pg.Client(conString);
  client.connect();
  return client;
}

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// http://localhost:3000/home?id=123
app.get('/home', (req, res) => {
  const id = req.query.id;
  if (id === '123') {
    const client = new pg.Client(conString);
    client.connect();
    client.query('SELECT * FROM public.users',
      (error, rows) => {
        client.end();
        res.json({ result: rows.rows });
      }
    );
  } else { res.status(401).json({ error: 'Unauthorized access detected' }); }
});

// http://localhost:3000/api/1
app.get('/api/:version', (req, res) => {
  res.send(req.params.version);
});

// http://localhost:8080/api/users/chris
app.get('/api/users/:name', (req, res) => {
  res.send(`What is up ${req.name}!`);
});

// parameter middleware that will run before the next routes
app.param('name', (req, res, next, name) => {
  const modified = `${name}-dude`;
  req.name = modified;
  next();
});


/**
 * Method use to to insert user detail into db
 */
app.post('/api/v1.0/users/signup', (req, res) => {
  const userName = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (userName !== 'undefined' && userName.length > 0 && email !== 'undefined' && email.length > 0 && password !== 'undefined' && password.length > 0) {
    const queryString = `INSERT INTO public.users(name, password, email) SELECT '${userName}', '${password}', '${email}' WHERE NOT EXISTS(SELECT email FROM public.users WHERE email ='${email}')`;
    console.log(queryString);

    const client = connectWithServer();
    client.query(queryString)
      .then((response) => {
        if (response.rowCount === 1) { res.json({ success: true }); } else { res.json({ error: 'Email already exits.' }); }
        client.end();
      })
      .catch((err) => {
        res.status(401).json({ error: err });
        client.end();
      });
  } else {
    res.status(401).json({ error: 'Required fields are missing' });
  }
});

/**
 * Login service.
 */
app.post('/api/v1.0/users/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email != null && email.length > 0 && typeof password !== 'undefined' && password.length > 0) {
    const queryString = `SELECT * FROM public.users WHERE email ='${email}' AND password ='${password}'`;
    const client = connectWithServer();
    client.query(queryString)
      .then((response) => {
        if (response.rowCount === 1) { res.status(200).json({ profile: response.rows[0] }); } else { res.json({ error: 'Unauthorized access detected.' }); }

        client.end();
      })
      .catch((err) => {
        res.json({ error: err });
        client.end();
      });
  } else {
    res.json({ error: 'Required fields are missing' });
  }
});

/**
 * Get user detail.
 * Send user id in header
 */
app.post('/api/v1.0/users/userDetail', (req, res) => {
  const userId = req.headers.userid;

  if (userId !== 'undefined' && userId.length > 0) {
    const queryString = `SELECT * FROM public.users WHERE id ='${userId}'`;
    const client = connectWithServer();
    client.query(queryString)
      .then((response) => {
        if (response.rowCount === 1) { res.json({ profile: response.rows[0] }); } else { res.json({ error: 'Unauthorized access detected.' }); }

        client.end();
      })
      .catch((err) => {
        res.status(401).json({ error: err });
        client.end();
      });
  } else {
    res.status(401).json({ error: 'Required fields are missing' });
  }
});


/**
 * Get available course list.
 */
app.get('/api/v1.0/courses/availableCourseList', (req, res) => {
  const queryString = 'SELECT * FROM public.t_course WHERE status = \'Active\'';
  const client = connectWithServer();
  client.query(queryString)
    .then((response) => {
      res.json({ result: response.rows });
      client.end();
    })
    .catch((err) => {
      res.status(401).json({ error: err });
      client.end();
    });
});

/**
 * Get course detail.
 * Send course id in header
 */
app.post('/api/v1.0/courses/courseDetail', (req, res) => {
  const courseId = req.headers.courseid;
  if (courseId !== 'undefined' && courseId.length > 0) {
    const queryString = `SELECT * FROM public.t_course tc INNER JOIN public.t_course_videos tcv ON tc.id = tcv.course_id WHERE tcv.course_id = ${courseId}`;
    const client = connectWithServer();
    client.query(queryString)
      .then((response) => {
        res.json({ result: response.rows });
        client.end();
      })
      .catch((err) => {
        res.status(401).json({ error: err });
        client.end();
      });
  } else {
    res.status(401).json({ error: 'Required fields are missing' });
  }
});


/**
 * Get course detail.
 * Send course id in header
 */
app.post('/api/v1.0/courses/userCourseDetail', (req, res) => {
  const courseId = req.headers.courseid;
  const userId = req.headers.userid;
  if (courseId !== 'undefined' && courseId.length > 0) {
    const queryString = `SELECT * from public.t_course tc LEFT JOIN public.t_user_course uc on uc.course_id = tc.id AND uc.user_id = '${userId}'  LEFT JOIN public.t_course_videos tcv on tc.id = tcv.course_id
    WHERE tc.id ='${courseId}'`;
    const client = connectWithServer();
    client.query(queryString)
      .then((response) => {
        res.json({ result: response.rows });
        client.end();
      })
      .catch((err) => {
        res.status(401).json({ error: err });
        client.end();
      });
  } else {
    res.status(401).json({ error: 'Required fields are missing' });
  }
});


const insertUserCourseData = (userId, courseId) => new Promise((resolve, reject) => {
  const queryString = `INSERT INTO public.t_user_course(user_id, course_id, status) SELECT '${userId}', ${courseId}, 'enrolled' WHERE NOT EXISTS(SELECT user_id,course_id  FROM public.t_user_course WHERE user_id ='${userId}' AND course_id =${courseId})`;
  const client = connectWithServer();
  client.query(queryString)
    .then((response) => {
      client.end();
      if (response.rowCount === 1) {
        resolve('success');
      } else {
        resolve('You are already enroll for this course');
      }
    })
    .catch((err) => {
      console.log(err);
      client.end();
      reject(err);
    });
});


/**
 *
 */
app.post('/api/v1.0/courses/enrollCourse', (req, res) => {
  const userId = req.body.data.user_id;
  const courseId = req.body.data.course_id;
  const totalVideo = req.body.data.total_video;
  const voucherCode = req.headers.voucher_code;
  if (userId !== 'undefined' && userId.length > 0 && courseId !== 'undefined' && courseId.length > 0) {
    if (voucherCode !== 'free') {
      const queryString = `SELECT voucher_code FROM public.t_course WHERE id = ${courseId} AND voucher_code ='${voucherCode}'`;
      const client = connectWithServer();
      client.query(queryString)
        .then((response) => {
          console.log(response);

          if (response.rowCount === 1) {
            const insertResponse = insertUserCourseData(userId, courseId, totalVideo);
            res.json(insertResponse);
          } else { res.json({ error: 'Please valid voucher code.' }); }
          client.end();
        })
        .catch((err) => {
          res.status(401).json({ error: err });
          client.end();
        });
    } else {
      const response = insertUserCourseData(userId, courseId, totalVideo);
      res.json(response);
    }
  } else {
    res.status(401).json({ error: 'Required fields are missing' });
  }
});


app.post('/api/v1.0/user/getUserCourses', (req, res) => {
  const userId = req.body.user_id;
  if (userId != null && userId.length > 0) {
    const queryString = `SELECT * FROM public.t_user_course uc INNER JOIN public.t_course tc ON uc.course_id = tc.id WHERE uc.user_id = '${userId}'`;
    console.log(queryString);

    const client = connectWithServer();
    client.query(queryString)
      .then((response) => {
        console.log(response);
        res.json({ result: response.rows });
        client.end();
      })
      .catch((err) => {
        res.status(401).json({ error: err });
        client.end();
      });
  } else {
    res.status(401).json({ error: 'Required fields are missing' });
  }
});


app.post('/api/v1.0/user/getUserCompletedCourses', (req, res) => {
  const userId = req.body.data.user_id;
  if (userId != null && userId.length > 0) {
    const queryString = `SELECT * FROM public.t_user_course uc INNER JOIN public.t_course tc ON uc.course_id = tc.id WHERE uc.user_id = '${userId}' AND uc.status = 'completed'`;
    console.log(queryString);

    const client = connectWithServer();
    client.query(queryString)
      .then((response) => {
        console.log(response);
        res.json({ result: response.rows });
        client.end();
      })
      .catch((err) => {
        res.status(401).json({ error: err });
        client.end();
      });
  } else {
    res.status(401).json({ error: 'Required fields are missing' });
  }
});


app.post('/api/v1.0/user/updateUserCourse', (req, res) => {
  const userId = req.body.data.user_id;
  const courseId = req.body.data.course_id;
  const completedVideo = req.body.data.completed_video;

  if (userId != null && userId.length > 0 && courseId != null && courseId.length > 0) {
    const queryString = `UPDATE public.t_user_course SET completed_videos = '${completedVideo}' WHERE user_id = '${userId}' AND course_id ='${courseId}'`;
    const client = connectWithServer();
    client.query(queryString)
      .then((response) => {
        console.log(response);
        res.json({ success: true });
        client.end();
      })
      .catch((err) => {
        res.status(401).json({ error: err });
        client.end();
      });
  } else {
    res.status(401).json({ error: 'Required fields are missing' });
  }
});


app.post('/api/v1.0/user/markCourseCompleted', (req, res) => {
  const userId = req.body.data.user_id;
  const courseId = req.body.data.course_id;

  if (userId != null && userId.length > 0 && courseId != null && courseId.length > 0) {
    const queryString = `UPDATE public.t_user_course SET status = 'completed' WHERE user_id = '${userId}' AND course_id ='${courseId}'`;
    const client = connectWithServer();
    client.query(queryString)
      .then((response) => {
        console.log(response);
        res.json({ success: true });
        client.end();
      })
      .catch((err) => {
        res.status(401).json({ error: err });
        client.end();
      });
  } else {
    res.status(401).json({ error: 'Required fields are missing' });
  }
});

app.get('/api/v1.0/course/getTotalVideos', (req, res) => {
  const queryString = 'SELECT * FROM public.t_course_videos cv INNER JOIN public.t_course tc ON cv.course_id = tc.id ORDER BY cv.name ASC';
  console.log(queryString);

  const client = connectWithServer();
  client.query(queryString)
    .then((response) => {
      console.log(response);
      client.end();
      res.json({ result: response.rows });
    })
    .catch((err) => {
      client.end();
      res.status(401).json({ error: err });
    });
});


/**
 * Passport login
 */


const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const strategy = new Auth0Strategy({
  domain: 'kamalkant.auth0.com',
  clientID: 'PrUSWN8HmuBcISeloXKNbD5iTtQqJSjc',
  clientSecret: 'kGS7nr9eygUEE907ra84yKnd5mIwKWmyml9uuAIvFShMFH_OW5cwU2YSXM-qAlge',
  callbackURL: 'http://localhost:3000/callback'
},
  (accessToken, refreshToken, extraParams, profile, done) =>
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
     done(null, {
       refreshToken,
       extraParams,
       profile
     })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(strategy);

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  (req, res) => {
    if (!req.user) {
      throw new Error('user null');
    }

    const extraParams = req.session.passport.user.extraParams;

    const redirectUrl = `http://localhost:3001/callback#access_token=${extraParams.access_token}&expires_in=${extraParams.expires_in}&token_type=Bearer&id_token=${extraParams.id_token}`;
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  }
);

app.get('/login', passport.authenticate('auth0', { accessType: 'offline' }), (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

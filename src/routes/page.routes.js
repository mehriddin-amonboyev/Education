import { Router } from 'express';

const pageroutes = Router();

pageroutes
    .get('/', (req, res) => {
        res.render('layouts/dashboard', {
            body: 'home' // home.ejs fayli yuklanadi
        });
    })
    .get('/courses', (req, res) => {
        res.render('layouts/dashboard', {
            body: 'courses' // Courses sahifasi yuklanadi
        });
    });

export default pageroutes;
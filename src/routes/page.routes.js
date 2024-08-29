import { Router } from 'express';

const pageRoutes = Router();

pageRoutes.get("/", (req, res) => {
    res.render("dashboard");
})

pageRoutes.get("/login", (req, res) => {
    console.log("Salom")
    res.render("login");
})

pageRoutes.get("/teacher", (req, res) => {
    res.render("teacher");
})

pageRoutes.get("/admin", (req, res) => {
    res.render("admin");
})
pageRoutes.get("/student", (req, res) => {
    res.render("student");
})
pageRoutes.get("/super-admin", (req, res) => {
    res.render("super-admin", {
        mainContentLink: `./component/super-admin-${req.query.tab}`,
    })
});

export default pageRoutes;
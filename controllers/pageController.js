const getIndexPage = (req, res) => {
  console.log("REQUSER --->", req.user);
  res.render("index", {
    link: "index",
  });
};

const getAboutPage = (req, res) => {
  res.render("about", {
    link: "about",
  });
};

const getRegisterPage = (req, res) => {
  res.render("register", {
    link: "register",
  });
};

const getLoginpage = (req, res) => {
  res.render("login", {
    link: "login",
  });
};
export { getIndexPage, getAboutPage, getRegisterPage, getLoginpage };

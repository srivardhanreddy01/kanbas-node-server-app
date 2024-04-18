import * as dao from "./dao.js";
let globalCurrentuser;

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
    return;
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    console.log(currentUser);
    if(currentUser){
      req.session["currentUser"] = req.body;
      globalCurrentuser=currentUser;
    }
    res.json(status);
  };


  const isAdmin = (req, res, next) => {
    if (!req.session["currentUser"]  || req.session["currentUser"].role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access Forbidden' });
    }
    next();
  };

  

  // const signup = async (req, res) => {
  //   const user = await dao.findUserByUsername(req.body.username);
  //   if (user) {
  //     res.status(400).json({ message: "Username already taken" });
  //     return;
  //   }
  //   const currentUser = await dao.createUser(req.body);
  //   globalCurrentuser = currentUser;
  //   req.session["currentUser"] = currentUser;
  //   res.json(currentUser);
  //   res.status(200).json({ message: "User successfully registred go back to Signin" });
  // };

  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      const currentUser = await dao.createUser(req.body);
      globalCurrentuser = currentUser;
      req.session["currentUser"] = currentUser;
      
      return res.status(200).json({ message: "User successfully registered. Go back to Signin" });
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  // const signin = async (req, res) => {
  //   const { username, password } = req.body;
  //   const currentUser = await dao.findUserByCredentials(username, password);

  //   if (currentUser) {
  //     console.log(currentUser);
  //     req.session["currentUser"] = currentUser;
  //     globalCurrentuser = currentUser;
  //     res.json(currentUser);
  //     return;
  //   } else {
  //     // res.sendStatus(401);
  //     // res.json(null);
  //     res.sendStatus(401).send("Invalid Credentials");
  //   }
  // };


  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
  
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        console.log(req.session, "pppp");
        console.log(req.session["currentUser"], "DFecsc");
        globalCurrentuser = currentUser;
        return res.json(currentUser);
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error in signin:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  
  // const signout = (req, res) => {
  //   req.session.destroy();
  //   res.sendStatus(200);
  // };
  const signout = async (req, res) => {
    console.log("Attempting to destroy session...");
    await req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Error destroying session");
      } else {
        console.log("Session destroyed successfully.");
        globalCurrentuser=null;
        res.sendStatus(200);
      }
    });
  };
  


  const profile = (req, res) => {
      const currentUser = globalCurrentuser;
      // const currentUser = req.session["currentUser"];
    console.log("profile", currentUser);
    if (!currentUser) {
      // res.sendStatus(401);
      res.json(null);
      return;
    }
    res.json(currentUser);
  };

  app.post("/api/users", createUser);  
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}



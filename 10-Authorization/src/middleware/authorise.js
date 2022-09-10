//roles is the array
const authorise = (roles) => {
  return (req, res, next) => {
    let isPermitted = false;
    //checkng if user has permitted role
    roles.map((role) => {
      if (req.user.role.includes(role)) {
        isPermitted = true;
      }
    });
    //if is permittd then go ahead
    if (isPermitted) {
      return next();
    }
    //else throw an error 
    else {
      return res.status(401).send({ message: "Access Denied" });
    }
  };
};

module.exports = authorise;

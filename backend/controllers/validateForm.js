const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username is too short")
    .max(30, "Username is too long"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short")
    .max(30, "Password is too long"),
});

const validateForm = (req, res) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        console.log("form data is valid");
      }
    });
};

module.exports = validateForm;

// listen for auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    // get data
    db.collection("guides")
      .get()
      .then((snapshot) => {
        setupGuides(snapshot.docs);
        setupUI(user);
      });
  } else {
    // if there is no user sign in
    setupGuides([]);
    setupUI();
  }
});

// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // signup the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    // close the modal and clear out the form
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();

  // logout the user
  auth.signOut();
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  // login the user
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the modal and clear out the form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});

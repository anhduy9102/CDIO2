// validation form register and register user local storage
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputGmailRegister = document.querySelector(".input-signup-gmail");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const btnRegister = document.querySelector(".signup__signInButton");

// validation form register and register user local storage

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    
    inputGmailRegister.value === "" ||
    inputPasswordRegister.value === ""
  ) {
    alert("vui lòng không để trống");
  } else {
    // array user
    const user = {

      username: inputGmailRegister.value,
      password: inputPasswordRegister.value,
    };
    let json = JSON.stringify(user);
    localStorage.setItem(inputGmailRegister.value, json);
    alert("Đăng Ký Thành Công");
    window.location.href = "login.html";
  }
});

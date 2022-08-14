const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const Sign_on = document.getElementById("Sign_on");
const forget_pwd = document.getElementById("forget_pwd");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

forget_pwd.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});


Sign_on.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    })
    //firstForm.addEventListener("submit", (e) => e.preventDefault());
    // secondForm.addEventListener("submit", (e) => e.preventDefault());
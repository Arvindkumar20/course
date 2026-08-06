let btn = document.getElementById("btn");
let name = document.getElementById("name");
let passwordInput = document.getElementById("password");
let nameError = document.getElementById("nameError");
let passwordErrorElement = document.getElementById("passwordError");

name.addEventListener("input", (e) => {
  nameError.innerText = "";
  nameError.remove();
});

passwordInput.addEventListener("input", (e) => {
  let passwordError = "";
  const value = e.target.value;
  console.log(value);
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(value)) {
    passwordError = "Password must contain at least one lowercase letter";
  }
  // Check for at least one uppercase letter
  else if (!/[A-Z]/.test(value)) {
    passwordError = "Password must contain at least one uppercase letter";
  }
  // Check for at least one number
  else if (!/[0-9]/.test(value)) {
    passwordError = "Password must contain at least one number";
  }
  // Check for at least one special character
  else if (!/[!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]/.test(value)) {
    passwordError = "Password must contain at least one special character";
  }
  // Check minimum length (8 characters)
  else if (value.length < 8) {
    passwordError = "Password must be at least 8 characters long";
  }
  // Check maximum length (optional, e.g., 64 characters)
  else if (value.length > 64) {
    passwordError = "Password must be less than 64 characters";
  }
  // Check for spaces (optional - disallow spaces)
  else if (/\s/.test(value)) {
    passwordError = "Password cannot contain spaces";
  } else {
    passwordError = "";
  }

  // Display error message

  if (passwordErrorElement) {
    passwordErrorElement.textContent = passwordError;
    passwordErrorElement.style.color = passwordError ? "red" : "green";
  }

  // Update password strength indicator (optional)
  updatePasswordStrength(value);
});

// Optional: Password strength indicator
function updatePasswordStrength(password) {
  let strength = 0;
  const indicators = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]/.test(password),
  };

  // Count how many criteria are met
  strength = Object.values(indicators).filter(Boolean).length;

  // Update strength bar or display
  const strengthElement = document.getElementById("passwordStrength");
  if (strengthElement) {
    const strengthLevels = [
      "Very Weak",
      "Weak",
      "Medium",
      "Strong",
      "Very Strong",
    ];
    const colors = ["#ff4444", "#ff8844", "#ffcc00", "#66cc66", "#44aa44"];
    const level = Math.min(strength, 5) - 1;

    strengthElement.textContent = `Strength: ${strengthLevels[level] || "Weak"}`;
    strengthElement.style.color = colors[level] || "#ff4444";
  }
}

const handleFormSubmissin = (e) => {
  e.preventDefault();
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  if (!name.value || name.value == "") {
    nameError.innerText = "Name is required";
  }

  let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegEx.test(email.value)) {
    emailError.innerText = "please enter a valid email";
    return;
  }

  if (password.value.length < 8) {
    passwordError.innerText = "Password is required";
    return;
  }

  console.log(name.value, email.value, password.value);
  name.value = "";
  email.value = "";
  password.value = "";
  console.log(passwordErrorElement);
  passwordErrorElement.remove();
  emailError.remove();
};

btn.addEventListener("click", handleFormSubmissin);

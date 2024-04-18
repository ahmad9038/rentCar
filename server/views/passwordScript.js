document.addEventListener("DOMContentLoaded", function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const userId = urlSearchParams.get("id");

  const userIdInput = document.getElementById("userId");
  userIdInput.value = userId;

  const form = document.getElementById("reset-password-form");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const submitButton = document.getElementById("submitButton");

    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords not matching";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Loading...";
    // If passwords match, continue with form submission
    try {
      const response = await fetch("/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
        }),
      });

      if (response.status == 201) {
        // Password reset successful, handle redirection or any other logic
        window.location.href = "http://localhost:3000/login";
      } else {
        // Handle errors from server
        console.log(response.status);

        console.error("Error resetting password:", response.statusText);
        errorMessage.textContent =
          "Error resetting password. Please try again.";
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      errorMessage.textContent = "Error resetting password. Please try again.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Reset Password";
    }
  });
});

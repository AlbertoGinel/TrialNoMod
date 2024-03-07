<template>
  <div class="login-container">
    <h1>Login Page</h1>
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from "~/components/LoginForm.vue";
</script>

<style>
/* Overall container styling */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Fill the viewport */
  background-color: #f5f5f5; /* Light gray background */
}

/* Title styling */
.login-container h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
  text-align: center;
}

/* LoginForm styling (adjust as needed based on LoginForm component's structure) */
.login-container .login-form {
  /* Inherit styles from the basic login form example provided earlier */
}
</style>

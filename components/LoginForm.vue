<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref("");
const password = ref("");
const isSubmitting = ref(false);
const error = ref(null);

const login = async () => {
  isSubmitting.value = true;
  error.value = null;

  try {
    const url = "https://api.fxer.net/api/login";
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const { data, pending, error, refresh } = await useFetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email: user.value,
        password: password.value,
        json: true,
      }),

      credentials: "include",

      onRequest({ request, options }) {
        console.log("onRequest", options);
        options.headers = options.headers || {};
        //options.headers.authorization = "...";
      },
      onRequestError({ request, options, error }) {
        console.log("onRequestError");
      },
      onResponse({ request, response, options }) {
        const cookieHeader = response.headers.get("Set-Cookie");
        const authHeader = response.headers.get("Authorization");
        console.log("Set-Cookie Header: ", cookieHeader);
        console.log("authHeader: ", authHeader);
        console.log("response: ", response.ok);
        if (response.ok) {
          router.push("/dashboard");
        }
      },
      onResponseError({ request, response, options }) {
        console.log("onResponseError");
      },
    });
  } catch (error) {
    console.error(error);
    error.value = "Login failed. Please try again later.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

Ensure Cookie Settings are Correct: When setting a cookie, it's crucial to
include attributes such as Secure, HttpOnly, SameSite, and potentially Domain
and Path to ensure the cookie is sent with every request to the appropriate
domain and path. These attributes help secure the cookie and prevent it from
being accessed or modified by client-side scripts, which is essential for
session management security 1.

<template>
  <form @submit.prevent="login">
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="user" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? "Loading..." : "Login" }}
    </button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<style>
/* Styles for the login form container */
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px; /* Adjust width as needed */
  margin: 0 auto; /* Center the form horizontally */
}

/* Styles for the label and input elements */
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box; /* Include padding in width calculation */
  margin-bottom: 15px;
}

/* Styles for the submit button */
button[type="submit"] {
  background-color: #4caf50; /* Green */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s; /* Add a smooth hover effect */
}

button[type="submit"]:hover {
  background-color: #3e8e41; /* Darker green on hover */
}

/* Styles for the error message */
.error {
  color: red;
  font-weight: bold;
}
</style>

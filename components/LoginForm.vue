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

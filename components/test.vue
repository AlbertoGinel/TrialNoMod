<script setup>
const user = ref("");
const password = ref("");
const isSubmitting = ref(false);
const error = ref(null);

const login = async () => {
  isSubmitting.value = true;
  error.value = null;

  try {
    const url = "trial";
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const { data, pending, error, refresh } = await useFetch(url, {
      method: "GET",
      headers: headers,
      body: JSON.stringify({
        email: user.value,
        password: password.value,
        json: true,
      }),

      credentials: "include",
      onRequest({ request, options }) {
        console.log("onRequest", options.headers);
        options.headers = options.headers || {};
        //options.headers.authorization = "...";
      },
      onRequestError({ request, options, error }) {
        console.log("onRequestError");
      },
      onResponse({ request, response, options }) {
        const cookie = response.headers.get("Set-Cookie");
        const authHeader = response.headers.get("Authorization");
        console.log("Cookie: ", cookie);
        console.log("authHeader: ", authHeader);

        if (response.ok) {
          console.log("Response data: ", data.value);
        } else {
          console.error("Error response: ", error.value);
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

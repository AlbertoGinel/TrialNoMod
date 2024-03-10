// src/routes/api/trial2.js
//import { defineEventHandler } from "nuxt3";

export default defineEventHandler(async (event) => {
  try {
    //const url = "https://restcountries.com/v3.1/all";
    const url = "https://api.fxer.net/api/trial";
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      return { status: response.status, body: "Error fetching data" };
    }

    const data = await response.json();

    return { status: 200, body: data };
  } catch (error) {
    console.error(error);
    return { status: 500, body: "Internal Server Error" };
  }
});

//api/trial.get.js
export default defineEventHandler(async (event) => {
  try {
    const url = "https://api.fxer.net/api/trial";
    const headers = {
      "Content-Type": "application/json",
      Cookie:
        "fxer_csrf=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiY2Q4MjZkNzg0OGJmMTY3ZDJjODBkMGQzYWZlNDc5M2U4YTUzMDlmNDRkMDFhMGJjM2I0MDk2Y2RkYzQyN2RhYTc1ZDFiNGNiOTllNDk1YzIiLCJpYXQiOjE3MDk3NDc4ODQuMTA1Mjg0LCJuYmYiOjE3MDk3NDc4ODQuMTA1Mjg1LCJleHAiOjE3MTEwNDM4ODQuMTAzMjA2LCJzdWIiOiIxNCIsInNjb3BlcyI6WyIqIl19.T0l5Znjt-Bph2co_UW9RAiq52Aq61qLka6AqA6P_k2cA_7_BUO4gmpI1QmxfI7DZLbnu9ZGFJhH0LC8UQMAMTPArcNE5UwfhBt_wttm7wC_AF8YgkPLJ1-I3nD2WkLA15K-QOVmjfuYVGZPus9PVmnO2UWCDR9Uh8BykYY1u4NLJBf5yUQE9mimamZnDY4m_qfQNQ4VGpSy07iX_mqgOsI0Dh8qfXZexYtdsh5QT8CTseQJjlNvRPpJ2juzgJL576KaRBtNweesMNYYmbYLXrqxx8FFSwk0XOioO7t5VDiJqtOLRAKayzJzZcH51lX1jdG4ciglhKXIcvq454VS_OfDBDae35mqitsNkQtLSa_e30OSe0l0Jq0ESsciGbmJwsiSXhMTjCm3Zy87_9f68zEgbU_mAlaGMGNoEkp-2VQuG-6iTX15ZtJjM3cyeF1NhjamuT91wEPc0GL1NKnIuA3AFJu0Ky2sRWb5kwCBGVMSnCYrQqYRaRBye0qDHAo5n7RcmgIn4labjWu_AKNi6LnOE44PyP7ilGj2hqRNXuuQG_TJ_-oigYTSRQC5xOMMXHRyX8OdovQN4ZXX72YyHEzYFhtZQMZDRTFmcvW2hG7T3nzVM7Jm8b6PebN6HR13JkYjfXc6S06uLVxmJXd2uBvvseGtt0TMR9-KozeRewHY",
    };

    const { data, pending, error, refresh } = await useFetch(url, {
      onRequest({ request, options }) {
        // Set the request headers
        options.headers = headers;
      },
      onRequestError({ request, options, error }) {
        return { status: 500, body: "Internal Server Error" };
      },
      onResponse({ request, response, options }) {
        // Process the response data
        return { status: 200, body: data };
      },
      onResponseError({ request, response, options }) {
        return { status: response.status, body: "Error fetching data" };
      },
    });
  } catch (error) {
    console.error(error);
    return { status: 500, body: "Internal Server Error" };
  }
});

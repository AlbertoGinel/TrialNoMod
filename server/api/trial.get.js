//api/trial.get.js
export default defineEventHandler(async (event) => {
  try {
    const url = "https://api.fxer.net/api/trial";
    const headers = {
      "Content-Type": "application/json",
      Cookie:
        "fxer_csrf=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNmY1ODNiOWU5ZGZiN2QyNWFlMjNiZjhkNGI5OTlhZWRmODIzNmE1ZjI4NjEwNDU3MTNlZDNmMWU5OWM3NmNjMDRiNWUxMGVjMjM1MGEwNWUiLCJpYXQiOjE3MDk4NTQyODUuMjI5MzM1LCJuYmYiOjE3MDk4NTQyODUuMjI5MzM3LCJleHAiOjE3MTExNTAyODUuMjI3MjkxLCJzdWIiOiIxNCIsInNjb3BlcyI6WyIqIl19.PiJVHN326nxlLiW0_QZPvTVtpi84HlJJf-biwd6X-cAsD-aHzp2Ma_j74bG7EygeWwDsgg6eR_0p6ne4_Hkm94r34UBhWdtE_YooUQiGnpKYkiwX3Zzr8sUR-7trA_zyFyiljGrE1j0Se4XZUzgEIQOyq0cjIvSKEGl2LLXULJhbIR6gIrRWy7H4KwIIihTVWRGl64-4VdjYQSM_woN8Mu70wFycVSkGNjMALFYt8TsCREsYkkR1CmE_-uFZPaPYWVT3b141Sew8r4nZMq8MC3zIy_rC-yPZTCN5uh8dJdQ0H9ma-DKmy7P4sCQ1inEQFk32njgKdjbAWBFylmHE2x9hS22dNb0cz9R7tU2ma5dFvyaberKVJvPWT3iyYsIW0DthSV5sZeSb1SuRDvum6ySX22CVZ4r7QcSKmySG049MklIREUy5mm8VL25lI-KmDSWEbUpFZQCjzCM0XFkE4rluCpX8aXoyJz_WcxR6HPZuoATfCewPHHfccN4QEqKOAsKBjzuGBO4CVi8MErUBiPbektyrXdPxdBgre79Erh7AN97TKE5skQNoxfnKR0F5Tp-cQ4hLt0D0fSOM1-mnJb4tW-P1fxYxi6sj-cJ9yTNBGQGE0rlNOpkNr7wU7gwVRCEGpGh8FJvCggDv1gSzuH_McdG2LAjoSYVXkMJJ3lA",
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

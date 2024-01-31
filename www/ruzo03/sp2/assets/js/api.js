
window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const APP_ID = "38ca4450";
const API_KEY = "dd89fbe8ed25c4690c0db9fd9745c9b1";
const TYPE = "public";

export const fetchData = async function (queries, successCallback) {
  const query = queries?.join("&")
    .replace(/,/g, "=")
    .replace(/ /g, "%20")
    .replace(/\+/g, "%2B");

  const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${query ? `&${query}` : ""}`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  }
}
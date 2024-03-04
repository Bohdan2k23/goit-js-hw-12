import axios from "axios";

const url = "https://pixabay.com/api/";

export async function getImages(keyword, page = 1) {
  const params = {
    key: "42543975-3eca36a47ffade116cf6655c4",
    q: keyword,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 15,
    page,
  };
  try {
    const { data } = await axios.get(url, { params });

    return data.hits;
  } catch (error) {
    return {
      error: true,
    };
  }
}

// const data = fetch(url + '?' + params.toString()).then(e => e.json());

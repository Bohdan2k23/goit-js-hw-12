import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages } from "./js/pixabay-api.js";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";
import { render } from "./js/render-functions.js";

const form = document.querySelector("form");
const gallery = document.querySelector("main");
const loader = document.querySelector("#loader");
const more = document.querySelector("#more");
let page = 1;
let value = "";

async function onSubmit(ev) {
  ev.preventDefault();

  const input = form.elements.image;

  if (input.value.trim()) {
    value = input.value.trim();
  }

  if (!value) return;

  loader.style.display = "";
  more.style.display = "none";
  const images = await getImages(value, page);

  if (images.error) {
    value = "";
    loader.style.display = "none";
    more.style.display = "none";
    return iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: "topRight",
    });
  }

  //показує загрузку бо не видно(
  await new Promise((res) => setTimeout(() => res(), 2000));

  loader.style.display = "none";
  more.style.display = "";
  input.value = "";

  if (images.length == 0) {
    more.style.display = "none";
    gallery.innerHTML = "";
    return iziToast.error({
      message:
        "Sorry, there are no images matching your search query. Please try again!",
      position: "topRight",
    });
  }

  render(images, gallery);

  const lightbox = new SimpleLightbox("main a", {
    captionsData: "alt",
    captionDelay: 250,
  });

  lightbox.refresh();
  page++;
}

form.addEventListener("submit", (ev) => {
  gallery.innerHTML = "";
  page = 1;
  onSubmit(ev);
});
more.addEventListener("click", onSubmit);

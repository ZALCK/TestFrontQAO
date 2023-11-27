import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Gallery from "../components/Gallery.vue";
import ArtworkDetails from "../components/ArtworkDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      redirect: "/gallery",
      children: [
        {
          path: "/gallery",
          name: "gallery",
          component: Gallery,
        },
        {
          path: "/search",
          name: "search",
          component: Gallery,
        },
        {
          path: "/artworkdetails:id",
          name: "artworkdetails",
          component: ArtworkDetails,
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
  ],
});

export default router;

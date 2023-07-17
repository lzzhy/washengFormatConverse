import { createRouter, createWebHistory } from "vue-router";
import settings from "@/settings";
import { projectRoutes } from "./routes";

const routes = [...projectRoutes];

const router = createRouter({
  history: createWebHistory(settings.projectDicUrl),
  routes,
});

export default router;

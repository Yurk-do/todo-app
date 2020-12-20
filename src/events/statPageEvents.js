import configureRouter from "../routerConfig.js";

export default function getBackToHomeButton(doc) {
  const router = configureRouter(doc, "/");
  router.navigate("/");
}

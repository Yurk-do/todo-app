import configureRouter from "./routerConfig.js";

export function startApplication(doc) {
  console.log("TODO application started");

  const router = configureRouter(doc, "/");

  router.navigate("/");
}

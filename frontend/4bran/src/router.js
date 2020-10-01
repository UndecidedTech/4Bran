import Vue from "vue"
import VueRouter from "vue-router"
import catalogPage from "./views/catalogPage"
import threadPage from "./views/threadPage"

Vue.use(VueRouter);

const routes = [
    { path: "/:board/catalog", component: catalogPage, name: "catalogPage", props: true},
    { path: "/:board/thread/:threadId", component: threadPage, name: "threadPage", props: true}
];

const router = new VueRouter({
    routes
})

export default router
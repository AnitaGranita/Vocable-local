// store.js
import { createStore } from "vuex";
import auth from "./auth";
import email from "../../../../vocable_local_working/FrontEnd/src/store/email";

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        email
    }
});

export default store;

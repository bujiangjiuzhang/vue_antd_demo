import Vue from "vue";
import Vuex from "vuex";
import {
  getList,
  addListItem,
  removeListItem,
  changeCheck,
} from "@/utils/listApi.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputValue: "",
    list: [],
    curKey: "all",
  },
  getters: {
    unfinished(state) {
      return state.list.filter((item) => !item.done).length;
    },
    filterList(state) {
      if (state.curKey === "all") {
        return state.list;
      } else if (state.curKey === "undo") {
        return state.list.filter((item) => !item.done);
      } else if (state.curKey === "isdo") {
        return state.list.filter((item) => item.done);
      }
    },
  },
  mutations: {
    allList(state, list) {
      state.list = list;
    },
    changeVal(state, val) {
      state.inputValue = val;
    },
    changeCurKey(state, key) {
      state.curKey = key;
    },
  },
  actions: {
    // 请求list数据
    async getlistSyc(context) {
      const lists = await getList();
      const {
        data: { data: res, code },
      } = lists;
      if (code === 200) {
        context.commit("allList", res);
      }
    },
    async addItem(context) {
      const obj = {
        id: context.state.list[context.state.list.length - 1].id + 1,
        info: context.state.inputValue,
        done: 0,
      };
      const res = await addListItem(obj);
      return res;
    },
    async removeItem(context, id) {
      const res = await removeListItem(id);
      return res;
    },
    async changeCheck(context, { id, done }) {
      console.log("id, done", id, done);
      const res = await changeCheck(id, done);
      return res;
    },
  },
  modules: {},
});

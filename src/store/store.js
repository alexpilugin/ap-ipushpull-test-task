import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

import {
  SET_ERROR,
  SET_LOADING,
  UPDATE_DATA,
  UPDATE_PAGE_CONTENT
} from './mutation-types.js';

let devMode = process.env.NODE_ENV === 'development';

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    globalError: '',
    loading: false,
    values: undefined,
    pageContent: undefined,
  },
  getters: {
    getDomains: (state) => state.values ? state.values.domains : undefined,
    getPageContent: (state) => state.pageContent ? state.pageContent.content : undefined,
    getPages: (state) => {
      const domains = state.values ? state.values.domains : undefined
      function getDomainPages(index) {
        if (domains && domains.length > 0) {
          if(domains[index].current_user_domain_page_access.count > 0) {
            return domains[index].current_user_domain_page_access.pages;
          }          
        }
      }
      //return a closure function:
      return getDomainPages;
    }
  },
  mutations: {
    [SET_ERROR]: (state, error) => {
      state.globalError = error
    },
    [SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading;
    },
    [UPDATE_DATA]: (state, payload) => {
      state.values = payload;
    },
    [UPDATE_PAGE_CONTENT]: (state, payload) => {
      state.pageContent = payload;
    },
  },
  actions: {
    logError: (context, err) => {
      if (devMode) console.log("Action: store/logError");
      context.commit(SET_ERROR, err);
    },
    stopLoading: (context) => {
      if (devMode) console.log("Action: store/stopLoading");
      context.commit(SET_LOADING, false);
    },
    startLoading: (context) => {
      if (devMode) console.log("Action: store/startLoading");
      context.commit(SET_LOADING, true);
    },
    loadData: (context) => {
      if (devMode) console.log("Action: store/loadData");
      context.commit(SET_LOADING, true);
      axios
        .get('https://www.ipushpull.com/api/1.0/domain_page_access/')
        .then(function (response) {
          context.commit(UPDATE_DATA, response.data); //mutation
          if (devMode) console.log(response.data);
          context.dispatch("stopLoading"); //action
        })
        .catch(err => {
          console.error(err);
          context.commit(SET_ERROR, err.toString()); //mutation
          context.dispatch("stopLoading"); //action
        })
    },
    loadPageContent: (context, { domainId, pageId }) => {
      if (devMode) console.log("Action: store/loadPageContent");
      context.commit(SET_LOADING, true);
      let path = `https://www.ipushpull.com/api/1.0/domains/id/${domainId}/page_content/id/${pageId}/`;
      axios
      .get(path)
      .then(function (response) {
        context.commit(UPDATE_PAGE_CONTENT, response.data); //mutation
        if (devMode) console.log(response.data);
        context.dispatch("stopLoading"); //action
      })
      .catch(err => {
        console.error(err);
        context.commit(SET_ERROR, err.toString()); //mutation
        context.dispatch("stopLoading"); //action
      })
    }
  },
  modules: {
  }
})

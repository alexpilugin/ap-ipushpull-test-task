<template>
  <div class="main">
    <!-- <LoadingScreen /> -->
    <v-container fluid>
      <v-main class="martop" wrap>
        <v-row>
          <v-col xs12 md6>
            <h2>{{ page_name }}</h2>
            <v-spacer />
          </v-col>
          <v-col xs12 md6 class="text-right flex-grow-1">
            <v-btn color="green" dark @click="updateData()">
              <v-icon>mdi-cached</v-icon> <span>Refresh</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs12 class="mx-5">
           <v-card :loading="loadingStatus" width="100%">
            <PageContentTable />
           </v-card>
          </v-col>
        </v-row>
      </v-main>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import LoadingScreen from "@/components/LoadingScreen.vue";
import PageContentTable from "@/components/PageContentTable.vue";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Main",
  props:['domain_id', 'page_id', 'page_name'],
  components: {
    LoadingScreen,
    PageContentTable
  },
  created() {
    console.log(this.$props);
    this.loadPageContent({
      domainId: this.domain_id, 
      pageId: this.page_id
    })
  },
  computed: {
    ...mapState({
      loadingStatus: (state) => state.loading,
      pageContent: (state) => state.pageContent
    }),
  },
  methods: {
    ...mapActions({
      loadPageContent: "loadPageContent",
    }),
    updateData() { 
      this.loadPageContent({
        domainId: this.domain_id, 
        pageId: this.page_id
      });
    }
  },
  beforeRouteUpdate (to, from, next) {
    //https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
    // react to route changes...
    // don't forget to call next()
    console.log("Main: before route update...")
    next();
  }
};
</script>
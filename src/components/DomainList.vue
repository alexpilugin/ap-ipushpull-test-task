<template>
  <v-container v-show="getDomains">
    <v-row class="text-left">
      <v-col cols="12">
        <v-card>
          <v-toolbar color="#1876d1" dark>
            <v-card-title class="layout">
              <div><h3 class="title text-sm-left">Domains</h3></div>
            </v-card-title>
          </v-toolbar>
          <v-container fluid class="pt-0">
            <v-row justify="space-between">
              <v-col xs12>
                <v-list class="pt-0" dense>
                  <v-list-item
                    v-for="(domain, index) in getDomains"
                    :key="`dom-${index}`"
                    class="list-column"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon class="pr-5">mdi-animation</v-icon>
                        {{ domain.display_name }} 
                        <span class="blue-grey--text darken-1">[{{ domain.id }}]</span>
                      </v-list-item-title>

                      <v-list dense v-show="getPages(index)">
                        <v-list-item
                          v-for="(page, pindex) in getPages(index)"
                          :key="`page-${pindex}`"
                          @click.stop="navigate(domain.id, page.id, page.name)"
                        >
                          <v-list-item-action class="pr-5">
                            <v-icon
                              >mdi-book-open-page-variant-outline</v-icon
                            >
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{page.name}}
                              <span class="blue-grey--text darken-1">[{{ page.id }}]</span>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "domain-list",
  computed: {
    ...mapState({
      values: (state) => state.values,
    }),
    ...mapGetters({
      getDomains: "getDomains",
      getPages: "getPages",
    }),
  },
  methods: {
    //navigate(domain.id, page.id)"
    navigate(domainId, pageId, pageName) {
      const self = this;
      //give time for animation
      setTimeout(function () {
        /*
          'domain/:domain_id/page:page_id'
          self.$router.push({ path: `/domain/${domainId}/page/${pageId}` }); 
        */       
        self.$router.push({
          name: 'main', 
          params: {
            domain_id: domainId,
            page_id: pageId,
            page_name: pageName
          }
        })        
      }, 300);
    },
  },
};
</script>

<style scoped>
.list-column {
  float: left;
}
</style>
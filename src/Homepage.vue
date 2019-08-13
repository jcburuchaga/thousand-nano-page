<style lang="scss">
.edit {
  display: inline-block;
  margin-top: 1em;
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 3px;
  background: #246648;
  color: white;
  font-weight: bold;

  button {
    margin-left: 5px;
  }
}
</style>

<template>
  <div class="container">

  <template v-if="loaded">
    <AdGrid v-on:showModal="showModal" v-if="$store.state.gridVis" ></AdGrid>    
  </template>
  <template v-if="!loaded">
      <div style="background-color:#000034;border-radius:0.2em">      
        <p style="text-align:center">Loading Collage!... </p>
      </div>
    <div class="adGrid" style="background-image:url('http://173.212.192.225/img/loading.gif');background-size:cover;"></div>
  </template>
    <PublishModal
      v-show="isModalVisible"
      @close="closeModal"> 
    </PublishModal>
  </div>
  </div>
</template>

<script>
import AdGrid from './AdGrid.vue' 
import PublishModal from './PublishModal.vue'


export default {
  props: [ "prerendered"],
  data() {
    return {
      showPublish: true,
      isModalVisible: false,
      loaded: false
    }
  },
  methods: {
    showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }, 
    loadAdsStatic() {
      this.$store.commit('clearAds');
      var xhr = new XMLHttpRequest();
      xhr.open("GET", this.prerendered.data, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        const resp = JSON.parse(xhr.responseText);
        const ads = resp.ads;  
        this.$store.commit('setOwnedAds', ads);         
        this.$store.commit('setAdsLength', ads.length);
        for (let i=0; i<ads.length; i++) {
          const ad = ads[i];
          // FIXME: Remove polyfill from old version 
          this.$store.commit('addAd', ad);
        }
        this.loaded = true;
      }.bind(this);
      xhr.send();
    },
  },
  created() {
      this.loadAdsStatic();
      return; 
  },
  components: {
    AdGrid,
    PublishModal
  },
}
</script>

<template>
  <div id="app" class="container">
    <header style="color:#000034">
     
     <table>  
     <tr>
     <td>
     <a href="https://nano.org/" target="_blank"><img  style="height: 120px" src="https://nanopixelwall.com/img/nano_full_hi-res.png" alt="Nano the feeless, fast, and green!" @click="showMain" /></a>
     </td> 
     <td>
     <input type="button" class="banbtnmenu" style="color:#000034" value="Wall" @click="showMain" />
     </td> 
     <td>
     <input type="button" class="banbtnmenu" style="color:#000034" value="Rules" @click="showRules" />
     </td> 
     </tr>
   </table>

      <h1>NanoPixelWall - Become a part of Nano History. </h1>
      <h2 style="color:#000034">1,000,000 pixels &middot; 0,0001 NANO per pixel &middot; Own a piece of NANO history! </h2>
      <br/>
      
       </header>
<template v-if="main">
<div style="background-color:#000034;border-radius:0.2em;">      
<br />
        <p style="margin:10px">How does it work?</p> 
        <p style="margin:10px">Simply select an area to buy, you can then upload your own logo, favorite image or meme. 
Once you have decided on an area you chose a title, a web address and an image. You will then be presented a Nano address to send funds and secure your place.</p>
<p style="margin:10px">Become a part of Nano history and buy your pixels. </p><br />
      </div>
      <br />
      <div class="sold" >      
        {{$store.state.adsPixels}} pixels sold <button class="banbtn" v-on:click="$store.commit('updatePreview', {x: 20, y: 20})" v-if="!$store.state.previewAd">Buy Pixels</button>
      </div>  
      <Homepage :prerendered="prerendered"></Homepage> 
    <div class="sold" v-if="main">
      {{$store.state.adsPixels}} pixels sold <button class="banbtn" v-on:click="$store.commit('updatePreview', {x: 20, y: 920})" v-if="!$store.state.previewAd">Buy Pixels</button>
    </div>
</template> 
<template v-if="rules">
<div style="background-color:#000034;border-radius:0.2em;">      
<br />
        <p style="margin:10px">NanoPixelWall </p> 
        <p style="margin:10px">This websitsite is in BETA and is currently being developed and improved. If you notice any issues mention them.</p>
        <p style="margin:10px">Do not submit items that are unlawful, harassing, abusive, threatening, harmful, obscene, profane, sexually orientated or racially offensive. It will be removed with no refund.</p>
        <p style="margin:10px">Have fun and don't be dumb.</p>
        <p style="margin:10px">Only send the amount of nano requested. sending the wrong amount could result in funds being lost and possibly losing your selected space.</p>
        <p style="margin:10px">Our Service will contain links to third-party web sites or services that are not owned or controlled by NanoPixelWall. </p>
        <p style="margin:10px">NanoPixelWall holds no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that NanoPixelWall shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services. </p>
        <p style="margin:10px">Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). The poster of said content is responsible for the upkeep and security of external websites linked.</p>
        <p style="margin:10px">Developed by - jcburuchaga <br />
Powered by - NanoIsSuperior
 <br />
  <br /></p>

      </div>
 
</template> 
    <footer> 
    </footer>

  </div>
</template>

<script>  
import Homepage from './Homepage.vue' 
import Owners from './Owners.vue' 
export default { 
  name: 'app',  
  data() {
    return { 
      'rules': false,
      'main': true,
      'isReadOnly': false, 
      'prerendered': {
      image:  "https://api.nanopixelwall.com/main_ads.png",
      data: 'https://api.nanopixelwall.com/v1/ad', 
      loadRemoteImages: true
      },
    }
  },
  methods: {
    showRules(){
      this.main = false;
      this.rules = true;
    },
    showMain(){
      this.rules = false;
      this.main = true;
    }
  },
  components: {
    'Homepage': Homepage,
    'Owners': Owners
  }
}
</script>

<style lang="scss">
header {
  h2 {
    display: inline-block;
  }
}
.sold {
  display: inline-block;
  margin-left: 0px;
  padding: 5px 10px;
  border-radius: 3px;
  background: #000034;
  color: white;
  font-weight: bold; 
  button {
    margin-left: 5px;
  }
}
</style>

<template>
  <div id="app" class="container">
    <header style="color:#000034">
     
     <table>  
     <tr>
     <td>
     <a href="https://nano.org/" target="_blank"><img  style="height: 120px" src="https://nanopixelwall.com/img/nano_full_hi-res.png" alt="Nano the feeless, fast, and green!" /></a>
     </td> 
     </tr>
   </table>

      <h1>NanoPixelWall - Become a part of Nano History. </h1>
      <h2 style="color:#000034">1,000,000 pixels &middot; 0,0001 NANO per pixel &middot; Own a piece of NANO history! </h2>
      <br/>
      
       </header>
<template v-if="ready">
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
    <div class="sold" v-if="ready">
      {{$store.state.adsPixels}} pixels sold <button class="banbtn" v-on:click="$store.commit('updatePreview', {x: 20, y: 920})" v-if="!$store.state.previewAd">Buy Pixels</button>
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
      'ready': true,
      'owners': false,
      'isReadOnly': false, 
      'prerendered': {
      image:  "https://api.nanopixelwall.com/main_ads.png",
      data: 'https://api.nanopixelwall.com/v1/ad', 
      loadRemoteImages: true
      },
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

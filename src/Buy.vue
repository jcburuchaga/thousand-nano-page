<style lang="scss">
#adBuy {
  position: absolute;
  background: #000034;
  border-radius: 1em;
  border : 3px solid red;
  display: block;
  width: 400px;
  height: 110px;
  margin-top: -110px;
  padding: 5px;
  text-align: center;
  
}
#adBuy.available {
  border-radius: 1em;
  border : 3px solid green;
}

.error {
  color: red;
  
}
</style>

<template>
  <div id="adBuy" v-show="$parent.enabled" v-bind:class="{ available: isAvailable }">
    <div>
      {{$parent.width}}x{{$parent.height}} = {{ $parent.width * $parent.height }} pixels at position ({{$parent.left}}, {{$parent.top}}).
    </div>
    <div>
      Price: {{price($parent.width, $parent.height)}} NANO.
    </div>

    <p v-if="error" class="error">{{error}}</p>
    <p v-else-if="success" class="success">{{success}}</p>
     
    <p v-else-if="isAvailable"> 
      <strong>Slot is available.</strong>
      <button class="banbtn" v-on:click="buy" v-bind:disabled="isReadOnly" v-if="this.$store.state.activeAccount">Buy Pixels</button> 
      <button class="banbtn" v-on:click="checkAccounts" v-else>Buy</button>
    </p>

    <p v-else>
      Slot is not available.
    </p>

    <br/>
  </div>
</template>

<script>

const nanoPerPixel = 0.0001;

export default {
  data() {
   
    return {
      error: null,
      success: null,
      available: false,
    }
  },
  computed: {
    isAvailable: function() {
      return this.checkAvailable(this.$parent.left, this.$parent.top, this.$parent.width, this.$parent.height, this.$store.state.ads);
    }
  },
  methods: {
    price(height, width) {
      // Round up to the nearest 0.01
      // TODO: BigNumber?
      return Math.ceil(height * width * nanoPerPixel * 100) / 100;
    },
    checkAccounts() {      
      this.$emit('showModal');
    },
    checkAvailable(x, y, width, height) {
      const x1 = Math.floor(x/10);
      const y1 = Math.floor(y/10);
      const x2 = x1 + Math.floor(width/10) - 1;
      const y2 = y1 + Math.floor(height/10) - 1;
      return !this.$store.getters.isColliding(x1, y1, x2, y2);
    },
  }
  
}
</script>

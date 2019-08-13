<template>
  <a :href="link" target="_blank">
    <div v-if="skipImage" :style="style" :title="title" :class="{ nsfwAd: !shown }" />
    <img v-else :src="image" :style="style" :title="title" :class="{ nsfwAd: !shown }" />
  </a>
</template>

<script>
function adStyle(ad) {
  if (!ad.width) {
    return {
      "display": "none",
    }
  }
  const s = {
    "left": ad.x + "px",
    "top": ad.y  + "px",
    "width": ad.width + "px",
    "height": ad.height + "px",
  }
  if (!ad.image_base_64) {
    s["background"] = "rgba(255, 255, 255, 0.5)";
  }
  return s;
}

function blacklist(link) {

  let sanitized =  link.trim().toLowerCase();
  if (sanitized.startsWith('javascript:') || sanitized.startsWith('data:')) {
    return true;
  } else {
    return false;
  }
}

export default {
  props: ["ad", "skipImage"],
  computed: {
    shown() {
      return true;
    },
    link() {
      if(!this.ad.link.includes("http"))
      {
        this.ad.link = "http://"+this.ad.link;
      }
      return this.ad.link;
    },
    title() {
      return this.ad.title;
    },
    image() {
      return this.ad.image_type + "," + this.ad.image_base_64;
    },
    style() {
      return adStyle(this.ad);
    },
  },
}
</script>

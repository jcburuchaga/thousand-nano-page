<style lang="scss">
#fileInput {
  display: none;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-8 { 
  margin-bottom: 1rem;
}
form {
  margin-bottom: 2em;
  width: 400px;
}
label {
  display: block;
  margin-bottom: 0.5em;
  span {
    display: inline-block;
    min-width: 6em;
  }
}
input {
  width: 200px;
}

.editAd {
 

  .previewAd img {
    display: block;
    overflow: hidden;
    font-size: 11px;
    color: rgba(0, 0, 0, 0.7);
    white-space: nowrap;
  }

  small {
    color: #966;
    margin: 0.5em;
    display: inline-block;
  }

  .mini-adGrid {
    padding: 10px;
    background: #ddd;
    margin-bottom: 1em;
  }
}


</style>

<template>
  <div id="adPublish">
    <form style="margin-left: 6em" v-if="!formIsHidden" v-on:submit='publish' v-on:submit.prevent>
      <div class="editAd">
        <p>         
          Add your favorite meme, arts, random images, everything you want! Now you can publish a GIF! only images less than 0.5 MB
        </p>
        <label>
          <span>Title</span>
          <input type="text" maxlength="50" ref="ad_title" placeholder="Come visit NanoCorp" />
        </label>
        <label>
          <span>Link</span>
          <input type="text" maxlength="150" ref="ad_link" placeholder="https://nano.org" />
        </label>
       
        <label>
          <span>Image</span>
          <div class="my-8">
            <img ref="imgPrev" src=""
    width="10" height="10" />
     <input id="file_mov" type="file" @change="onFileChange">
    </div>
        </label>
          
        <table>
        <tr>
          <td>
          <input type="submit" class="banbtn" value="Publish Changes" />
          </td>
          <td>
          <input type="button" class="banbtno" value="Cancel" @click="cancelModal" />
          </td>
        </tr>
        </table>
      </div>
    </form>

    <p v-if="error" class="error">
      {{ error }}
    </p>
    <div v-if="pay" >
      to publish your photo art! transfer {{price()}} NANO to address
       <hr>
      <center><qrcode-vue :value="account" size="100"  level="M"></qrcode-vue>
       <small>{{account}}</small></center>
    </div>
  </div>
</template>

<script>
import Ad from './Ad.vue'
import axios from 'axios'
import QrcodeVue from 'qrcode.vue';

export default { 
  data() {
   
    return {
      ad: false,
      error: null, 
      pay : null,
      formIsHidden:false,
      account: "",
      image: ''
    }
  }, 
  methods: {
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      await this.createImage(files[0]);  
      
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result; 
        this.$refs.imgPrev.width = this.$store.state.previewAd.width;
        this.$refs.imgPrev.height = this.$store.state.previewAd.height; 
        this.$refs.imgPrev.src = this.image
      };
      return reader.readAsDataURL(file);
    },
    async checkDeposit(ac) { 
      setInterval(async function () {
         let x = await axios.post('https://api.nanopixelwall.com/v1/check_deposit', {
           acc : ac
         })
                .then(function (response) {
                  
                  if(response.data == true)
                  {
                   location.reload();
                  }
                })
                .catch(function (error) {  
                }); 
    }, 5000);
   },
    cancelModal()
    {
      this.$refs.imgPrev.width = "10";
      this.$refs.imgPrev.height = "10";
      this.$refs.imgPrev.src = "";
      document.getElementById('file_mov').value = null;
      this.image = null;
      this.$emit("cancelModal");
    },
    price() {
      // Round up to the nearest 0.01
      // TODO: BigNumber?
      return Math.ceil(this.$store.state.previewAd.height * this.$store.stateAd.width * 0.0001 * 100) / 100;
    },
    async publish() {  
      if(this.$refs.imgPrev.src == null)
      {
        alert('upload image!');
        return false;
      }
      if(this.$refs.imgPrev.src == "" || this.$refs.ad_title.value == "" || this.$refs.ad_link.value == "" )
      {
        
          alert('complete all!');
      }
      else{
        let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      if (!regexp.test(this.$refs.ad_link.value ))
      {
          alert('verify your url!, is not valid...');
          return false;
      }
      var account = "";  
      let x = await axios.post('https://api.nanopixelwall.com/v1/ad', { 
                    x : this.$store.state.previewAd.x,
                    y : this.$store.state.previewAd.y,
                    width : this.$store.state.previewAd.width,
                    height : this.$store.state.previewAd.height,                    
                    title : this.$refs.ad_title.value,
                    link : this.$refs.ad_link.value,
                    image_base_64 : this.image.split(',')[1],
                    image_type : this.image.split(',')[0]
                })
                .then(function (response) {
                    if(response.data.account == "" || response.data.account == null )
                    {
                      alert("sorry, we cant publish that!")
                      return false;
                    }
                    account = response.data.account;
                   
                })
                .catch(function (error) { 
                    alert("sorry, we cant upload your photo")
                    return false;
                });
                this.account = account;
                this.formIsHidden = true;
                this.pay = true;
                this.checkDeposit(account);
      }
      return false;
    },
  },
  components: {
    Ad,
    QrcodeVue
  },
}
</script>

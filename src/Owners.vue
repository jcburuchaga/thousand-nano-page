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
<table style="background-color:#000034;width:1000px">
    <thead>
        <tr>
            <th style="color:#4a90e2">Owner</th>  
            <th style="color:#4a90e2">Title</th>  
        </tr>
    </thead>
    <owners></owners>
</table> 
</template>

<script> 
 var owners = {
    template: `
        <tbody>
            <tr v-for="list in UsersData">
                <th>{{list.owner}}</th>  
                <th style="color:#F4FAFF">{{list.title}}</th>  
            </tr>
        </tbody>
    `,
    data: function () { 
        return {
            UsersData : this.$store.state.ownedAds //get data from query
            
        }
    }
}
export default { 
  data() {
   
    return {
      ad: false,
      error: null, 
      pay : null,
      formIsHidden:false,
      account: ""
    }
  },
  components: {
    owners
  }
}
</script>

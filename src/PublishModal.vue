<script>
import Publish from './Publish.vue'  
  export default {
    name: 'modal',

    methods: {
      close() {
        this.$emit('close');
      },
    },
  components: {
    Publish
  },
  };
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <section class="modal-body"> 
        <slot name="body">
          <Publish v-on:cancelModal="close"  ></Publish>
        </slot>
       </section>
    </div>
  </div>
</template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #000034;
    box-shadow: 2px 2px 20px 1px #F4FAFF;
    overflow-x: auto;
    display: flex;
    width:622px;
    flex-direction: column;
    border-radius: 0.7em;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
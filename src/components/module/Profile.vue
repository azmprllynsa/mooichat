<template>
  <div>
    <div class="friendsinfo hide">
      <div class="main-profil">
        <div class="close">
          <a href="#" @click="closeModal">X</a>
        </div>
        <div class="head-profil">
          <div class="photo">
            <img :src="friends.imageProfile" alt="">
          </div>
          <div class="nama">
            <h5>{{friends.displayName}}</h5>
            <p>{{friends.email}}</p>
          </div>
        </div>
        <div class="body-profil">
          <div class="phone">
            <i class="fas fa-mobile-alt"></i>
            <p>{{friends.phoneNumber}}</p>
          </div>
          <div class="location">
            <i class="fas fa-map-marker-alt"></i>
            <input type="text" value="このはがくれ">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
// import db from '../firebaseInit'
export default {
  name: 'FriendsInfo',
  props: ['friends'],
  data() {
    return {
      uploadValue: 0,
      picture: null,
      imageData: null,
      coordinates: {
        lat: 0,
        lng: 0,
      },
    };
  },
  methods: {
    closeModal() {
      const closeMdl = document.querySelector('.friendsinfo');
      closeMdl.classList.add('hide');
    },
  },
  created() {
    this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates;
      })
      .catch((error) => alert(error));
  },
};
</script>

<style scoped>
  .friendsinfo{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .50);
  }
  .main-profil{
    width: 370px;
    height: 420px;
    background: #fff;
    margin: 80px auto;
    position: relative;
  }
  .hide{
    display: none;
  }
  .head-profil{
    height: 150px;
    background-color: #5580a3;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
  }
  .close{
    position: absolute;
    left: 345px;
  }
  .close a{
    text-decoration: none;
    color: #fff;
  }
  #progress{
    width: 80px;
    height: 10px;
    position: absolute;
    top: 40px;
    left: 7px;
  }
  .photo{
    margin-left: 20px;
    margin-bottom: 10px;
    position: relative;
  }
  .photo img{
    width: 95px;
    height: 95px;
    border-radius: 50%;
    object-fit: cover;
  }
  .nama{
    margin-left: 10px;
  }
  .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.upload-image{
  position: absolute;
  top: 120px;
  left: 295px;
}
.phone, .location{
  width: 310px;
  margin-top: 40px;
  margin-left: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.phone img, .location img{
  width: 70px;
  margin-left: 20px;
  margin-bottom: 5px;
}
.phone input, .location input{
  margin-left: 20px;
  margin-top: 5px;
  font-size: 17px;
  border: none;
}
.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  width: 60px;
  height: 60px;
}
.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>

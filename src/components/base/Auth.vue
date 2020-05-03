<template>
<div class="column is-gapless is-full pict-container">
  <div class="column is-gapless is-full mooichat">
    <img src="../../assets/img/head.png" alt="tes">
  </div>
</div>
</template>

<script>
export default {
  name: 'Head',
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.pict-container{
  background-color: rgb(252, 207, 126);
  height: 100vh;
}

img {
  width: 400px;
  margin-left: calc(50vw - px);
  margin-top: 100px;
  padding: 10px;
}

.mooichat h1{
    left: 17px;
    font-size: 30px;
    color: #ff5f33;
    font-family: Airbnb Cereal App;
    font-weight: 400;
    text-align: center;
}

.mooichat p{
    left: 1px;
    font-size: 18px;
    color: #ff5f33;
    font-family: Airbnb Cereal App;
    text-align: center;
}

.button-form {
  text-align: center;
}

.button {
  background: #ff5f33;
  color: #fff;
}

@media (min-width: 992px) {
.pict-container{
  height: 100%;
}
.mooichat img {
  width: 450px;
  margin-top: 70px;
  margin-left: calc(50vw - 225px);
  /* margin-top: calc(60px); */
}
.pict-container{
  background-color: rgb(252, 207, 126);
    height: 100vh;
}
}
</style>

<template>
  <div>
    <NavbarAuth/>
    <!-- <Auth class="background"/> -->
    <div class="auth">
      <Auth class="bg-auth"/>
      <div class="column is-gapless is-full mooichat">
        <p>Keep Up to Your Friend and The World With Us</p>
      </div>
      <div class="column is-gapless is-full button-form">
        <router-link to="/register" class="button is-rounded bg-orange">Get Started</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../components/base/Auth.vue';
import NavbarAuth from '../components/module/Navbar.vue';

export default {
  name: 'LandingPage',
  components: {
    Auth,
    NavbarAuth,
  },
};
</script>

<style scoped>
.bg-auth{
  margin-top: -56px;
}

.mooichat {
  margin-top: -180px;
  padding: 0px;
}

.mooichat p{
    left: 1px;
    font-size: 17px;
    color: #ff5f33;
    font-family: Airbnb Cereal App;
    text-align: center;
}

.button-form {
  text-align: center;
  padding: 0px;
}

@media (min-width: 992px) {
  .mooichat {
    margin-top: -140px;
    padding: 0px;
  }
  .mooichat p {
    font-size: 22px;
  }
}
</style>

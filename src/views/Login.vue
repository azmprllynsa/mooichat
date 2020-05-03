<template>
  <div>
    <Auth class="background"/>
    <div class="form-register">
      <div class="field register-title">
        <h3 class="orange">Login</h3>
        <p>Don't have an account? <router-link to="/register" class="orange">Register</router-link>
        </p>
      </div>
      <form @submit="signIn">
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="email" placeholder="Enter Your Email..." v-model="email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Enter Your Password..."
            v-model="password">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field button-register">
            <button type="submit" class="button bg-orange is-fullwidth">
              Login
            </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import Auth from '../components/base/Auth.vue';

export default {
  name: 'Login',
  components: {
    Auth,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signIn(e) {
      e.preventDefault();
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            title: `${this.email} Successfully Login!`,
            showConfirmButton: false,
            timer: 3000,
          });
          this.$router.push('/');
        },
        (err) => {
          this.$swal.fire({
            icon: 'error',
            title: `${err.message}`,
          });
        });
    },
  },
};
</script>

<style scoped>
.background{
  position: absolute;
  z-index: -1;
}

.form-register {
  /* height: 500px; */
  width: 300px;
  margin-left: calc(50% - 150px);
  margin-top: 170px;
  background: #fff;
  padding: 10px 20px 20px 20px;
  position: absolute;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}

.button-register{
  /* text-align: center; */
  margin-top: 30px;
}

.register-title{
  text-align: center;
  padding-bottom: 20px;
}

.register-title h3{
  font-size: 25px;
  margin-bottom: 6px;
  font-weight: bold;
  font-family: Brown Regular;
}

.register-title p{
  /* font-size: 25px; */
  /* margin-bottom: 10px; */
}
</style>

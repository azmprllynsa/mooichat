<template>
  <div>
    <Auth class="background"/>
    <div class="form-register">
      <div class="field register-title">
        <h3 class="orange">Register Now!</h3>
        <p>Already have account? <router-link to="/login" class="orange">Login</router-link>
        </p>
      </div>
      <form @submit="signUp">
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="text" id="username"
            placeholder="Username" v-model="displayName">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="email" id="email" placeholder="Email" v-model="email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" id="inputPassword" placeholder="Password"
            v-model="password">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field button-register">
            <button class="button bg-orange is-fullwidth" type="submit">
              Register
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
  name: 'Register',
  components: {
    Auth,
  },
  data() {
    return {
      email: '',
      password: '',
      displayName: '',
      imageProfile: 'https://firebasestorage.googleapis.com/v0/b/chatmee-3a979.appspot.com/o/profil%2Fuser-profile.png?alt=media&token=54d73fa0-5b19-499f-9032-b659df1d10d1',
    };
  },
  methods: {
    signUp(e) {
      e.preventDefault();
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({
              id: firebase.auth().currentUser.uid,
              email: this.email,
              displayName: this.displayName,
              imageProfile: this.imageProfile,
              phoneNumber: 0,
            })
            .catch((err) => {
              this.$swal.fire({
                icon: 'error',
                title: `${err.message}`,
              });
            });
          // eslint-disable-next-line no-alert
          this.$swal.fire({
            icon: 'success',
            title: `${this.email} Successfully Registered!`,
            showConfirmButton: false,
            timer: 3000,
          });
          // alert(`Register user ${this.email} Success!`);
          this.$router.push('/login');
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

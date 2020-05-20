<template>
  <div class="body orange-bg">
    <div class="columns is-gapless container">
      <div class="column is-gapless is-4 sidebar">
        <div class=" navbar column is-gapless bg-orange">
          <div class="column lists" @click="friendsInfo">
            MooiChat
          </div>
          <div class="column panels">
              <div class="dropdown is-right">
               <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
               <i class="fas fa-ellipsis-v" aria-hidden="true"></i></button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div class="dropdown-item" @click="terserahLah">Profile</div>
                  <div class="dropdown-item" @click="logout">Logout</div>
                </div>
              </div>
          </div>
        </div>
        <div class="column sidebar-body">
          <div class="chat-contact">
            <div class="list-friends" v-for="contact in this.profile" :key="contact.id">
              <div class="private" @click="contactList" v-if="contact.email !== authUser.email">
                <div class="private-image">
                  <img :src="contact.imageProfile" alt="">
                </div>
                <div class="firends-name">
                  <h5>{{contact.displayName}}</h5>
                    <p>{{contact.email}}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-gapless is-8 body-side ">
        <div class=" navbar column is-gapless bg-orange">
          <div class="column lists contact-name">
            <div class="listimage">
              <img :src="bannerName.imageProfile" alt="" >
            </div>
            <div class="listname" @click="friendsInfo">
              <h3>{{bannerName.displayName}}</h3>
            </div>
          </div>
        </div>
        <div class="column messages">
          <div class="chat-empty">
            <h1>Please select a chat to start messaging</h1>
          </div>
          <div class="column mesgs">
            <div class="msg_history">
              <div class="incoming_msg" >
                <div class="received_msg" v-for="chat in messages" :key="chat.id">
                <div :class="[chat.received === authUser.email? 'sent_msg': 'received_msg']" >
                  <p>{{chat.message}}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="type_msg">
          <div class="input_msg_write">
            <input  type="text" class="input write_msg"
              placeholder="Type a message" v-model="message"/>
            <button class="msg_send_btn" type="button"
              @click="sendMessage" @keyup.enter="sendMessage">
              <i class="far fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <friends-info v-bind:friends="bannerName"/>
</div>
</template>

<script>
import firebase from 'firebase';
import db from '../firebaseInit';
// import Modal from '../components/module/Modal.vue';
import friendsInfo from '../components/module/FriendsInfo.vue';

export default {
  name: 'chat',
  components: {
    // Modal,
    friendsInfo,
  },
  data() {
    return {
      message: null,
      messages: [],
      authUser: {},
      profile: [],
      myContact: '',
      bannerName: [],
      personalChat: [],
    };
  },
  methods: {
    sendMessage() {
      db.collection('chat').add({
        message: this.message,
        sender: this.authUser.email,
        received: this.bannerName.email,
        createdAt: new Date(),
      });
      this.message = null;
    },
    showMessage() {
      db.collection('chat').where('sender', '==', this.authUser.email);
      db.collection('chat').where('received', '==', this.bannerName.email);
      db.collection('chat').orderBy('createdAt')
        .onSnapshot((querySnapshot) => {
          // eslint-disable-next-line prefer-const
          let allMessage = [];
          querySnapshot.forEach((doc) => {
            if ((doc.data().received === this.bannerName.email && doc.data().sender
            === this.authUser.email && doc.data().message !== null && doc.data().message !== ' ')
            || (doc.data().received === this.authUser.email
            && doc.data().sender === this.bannerName.email && doc.data().message !== null
            && doc.data().message !== ' ')) {
              allMessage.push(doc.data());
            }
            // return allMessage;
          });
          this.messages = allMessage;
          // console.log(this.messages);
        });
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    },
    getUser() {
      db.collection('users').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.profile.push(doc.data());
        });
      });
    },

    terserahLah() {
      const showProfil = document.querySelector('.profil');
      showProfil.classList.toggle('hide');
    },

    friendsInfo() {
      const friends = document.querySelector('.friendsinfo');
      friends.classList.toggle('hide');
    },

    contactList(e) {
      const empty = document.querySelector('.chat-empty');
      const chat = document.querySelector('.mesgs');
      empty.classList.add('full');
      chat.classList.toggle('full');
      this.myContact = e.target.textContent;
      this.bannerContact();
      this.showMessage();
    },
    bannerContact() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.profile.length; i++) {
        if (this.profile[i].displayName === this.myContact) {
          this.bannerName = this.profile[i];
        }
      }
    },
    chatPersonal() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.messages.length; i++) {
        // eslint-disable-next-line max-len
        if (this.messages[i].sender === this.authUser.email
    && this.messages[i].received === this.bannerName.email) {
          this.personalChat.push(this.messages[i]);
        }
        console.log(this.messages[i]);
      }
    },

  },
  created() {
    if (firebase.auth().currentUser) {
      this.authUser = firebase.auth().currentUser;
    }
    this.getUser();

    // this.showMessage();
  },
};
</script>


<style scoped>
img {
  border-radius: 50%
}
.body{
  display: flex;
  justify-content: center;
  min-height: 100vh;
  font-size: 1em;
  letter-spacing: 0.1px;
  text-rendering: optimizeLegibility;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
}
.container{
  padding: 0px !important;
  width: 100vw;
  height: 100vh;
  background: #E6EAEA;
}
.sidebar{
  background: #f5f5f5;
}
.navbar{
    position: sticky;
    align-items: center;
    box-shadow: 4px 1px 5px rgba(0,0,0,0.2);
    display: flex;
    height: 60px;
}
.panels{
  text-align: right;
  margin: 0px !important;
  padding: 0px !important;
}

.lists{
  font-size: 20px;
  margin-top: -5px;
}

.sidebar-body{
  height: calc(96vh - 60px);
}

.inbox_people {
  background: #f5f5f5 none repeat scroll 0 0;
  float: left;
  width: 40%; border-right:1px solid #c4c4c4;
}

.chat-contact{
  height: 640px;
  overflow-y: scroll;
}

.private{
  height: 85px;
  display: flex;
  cursor: pointer;
  border-bottom: 1px solid rgb(252, 207, 126);
}

.private:hover{
  background-color: #c4c4c4;
}

.full{
  display: none;
}

.private-image img{
  width: 70px;
  margin-top: 6px;
  margin-left: 10px;
}

.firends-name{
  margin-left: 30px;
  margin-top: 19px;
}

.messages{
  display: flex;
  flex-direction: column;
}

.contact-name{
  display: flex;
  align-items: center;
  width: 100%;
}

.contact-name img{
  width: 40px;
}

.listname h3{
  margin-left: 15px;
  font-size: 20px;
  font-weight: 450;
}

.chat-empty{
  position: absolute;
  top: 45%;
  left: 60%;
  width: 210px;
}

.chat-empty h1{
  font-size: 20px;
  text-align: center;
  color: #ccc;
}

.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
  position: relative;
}

.top_spac{ margin: 20px 0 0;}
.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}

.headind_srch{
  padding:10px 29px 10px 20px;
  margin-bottom: 5px;
  border-bottom:1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}

.srch_bar input{
  border:1px solid #cdcdcd;
  border-width:0 0 1px 0; width:80%;
  padding:2px 0 4px 6px;
  background:none;
}

.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}

.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}

.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{
  overflow:hidden;
  clear:both;
  padding-bottom: 30px;
  cursor: pointer;
}

.chat_people:hover{
background-color: #fff;
}

.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}

.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat{ background:#ebebeb;}
.incoming_msg_img {
  display: inline-block;
  width: 6%;
}

.received_msg {
  display: inline-block;
  /* padding: 0 0 0 10px; */
  vertical-align: top;
  width: 100%;
}

.received_msg p {
  background: #f5f5f5 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  color:#ff5f33;
  padding: 5px 10px 5px 12px;
  border-radius: 10px;
  float: left;
}

.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  padding: 5px 10px 5px 12px;
  width: 100%;
  border-radius: 10px;
}

.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}

.received_withd_msg { width: 57%;}

.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 100%;
}

.sent_msg p {
  background: #ff5f33 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  color:#fff;
  padding: 5px 10px 5px 12px;
  border-radius: 10px;
  width:100%;
}

.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}

.sent_msg {
  float: right;
  /* width: 46%; */
}

/* .input_msg_write {
  margin-top: 20px !important;
} */

.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #ff5f33 none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}

.messaging {
  padding: 0 0 50px 0;
}

.msg_history {
  height: 570px;
  overflow-y: auto;
}

.message-input {
  /* position: absolute; */
  bottom: 0;
  /* width: 100%; */
  z-index: 99;
  align-items: center;
  justify-content: center;
}

.wrap input {
  float: left;
  border: none;
  width: calc(100% - 120px);
  font-size: 0.8em;
  color: #32465a;
}

.write_msg {
  padding-right:100px;
}
.message-input .wrap button {
  /* float: right; */
  border: none;
  width: 50px;
  padding: 4px 0;
  cursor: pointer;
  background: #ff5f33;
  color: #f5f5f5;
}
</style>

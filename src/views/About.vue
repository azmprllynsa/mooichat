<template>
  <div class="body orange-bg">
    <div class="columns is-gapless container">
      <div class="column is-gapless is-4 sidebar">
        <div class=" navbar column is-gapless bg-orange">
          <div class="column lists">
            MooiChat
          </div>
          <div class="column panels">
              <div class="dropdown is-right">
               <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
               <i class="fas fa-ellipsis-v" aria-hidden="true"></i></button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Profil</a>
                  <a class="dropdown-item" href="#">About</a>
                  <a class="dropdown-item" href="#" @click="logout">Logout</a>
                </div>
              </div>
          </div>
        </div>
        <div class="column sidebar-body">
          <div class="chat-contact">
            <div class="list-friends" v-for="contact in this.profil" :key="contact.id">
              <div class="private" @click="contactList" v-if="contact.email !== authUser.email">
                <div class="private-image">
                  <img :src="contact.imageProfil" alt="">
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
              <img :src="bannerName.imageProfil" alt="" >
            </div>
            <div class="listname">
              <h3>{{bannerName.displayName}}</h3>
            </div>
          </div>
        </div>
        <div class="messages">
          <div class="chat-empty full">
            <h1>Please select a chat to start messaging</h1>
          </div>
          <div class="mesgs">
            <div class="msg_history">
              <div class="incoming_msg" >
                <div class="received_msg" v-for="chat in messages" :key="chat.id">
                <div :class="[chat.sender === authUser.email? 'received_msg': 'sent_msg']" >
                  <p>{{chat.message}}</p>
                  </div>
              </div>
            </div>
          </div>
          <div class="column message-input">
            <div class="wrap">
              <input class="is-fullwidth" type="text" placeholder="Write your message..." />
              <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
              <button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';
import db from '../firebase';

export default {
  name: 'chat',
  data() {
    return {
      message: null,
      messages: [],
      authUser: {},
      profil: [],
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
      db.collection('chat').where('received', '==', this.authUser.email).where('sender', '==', this.bannerName.email).orderBy('createdAt')
        .onSnapshot((querySnapshot) => {
          const allMessage = [];
          querySnapshot.forEach((doc) => {
            allMessage.push(doc.data());
          });
          this.messages = allMessage;
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
          this.profil.push(doc.data());
        });
      });
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
      for (let i = 0; i < this.profil.length; i++) {
        if (this.profil[i].displayName === this.myContact) {
          this.bannerName = this.profil[i];
        }
      }
      // this.chatPersonal()
    },
    chatPersonal() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].sender === this.authUser.email
        && this.messages[i].received === this.bannerName.email) {
          this.personalChat.push(this.messages[i]);
          console.log(this.personalChat);
        }
      }
    },
  },
  created() {
    if (firebase.auth().currentUser) {
      this.authUser = firebase.auth().currentUser;
    }
    // this.showMessage()
    this.getUser();
  },
};
</script>


<style scoped>
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
  width: 95%;
  min-width: 360px;
  max-width: 1010px;
  height: 96vh;
  min-height: 300px;
  max-height: 720px;
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
  height: 600px;
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
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
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
  width: 60%;
}

.sent_msg p {
  background: #05728f none repeat scroll 0 0;
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
  width: 46%;
}

.imput_msg_write {
  padding-top: -20px !important;
}

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

.messaging { padding: 0 0 50px 0;}

.msg_history {
  height: 516px;
  overflow-y: auto;
}

.message-input {
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  z-index: 99;
}

.message-input .wrap {
  position: relative;
}

.message-input .wrap input {
  float: left;
  border: none;
  width: calc(100% - 90px);
  padding: 11px 32px 10px 8px;
  font-size: 0.8em;
  color: #32465a;
}
@media screen and (max-width: 735px) {
  .message-input .wrap input {
    padding: 15px 32px 16px 8px;
  }
}

.message-input .wrap input:focus {
  outline: none;
}

.message-input .wrap .attachment {
  position: absolute;
  right: 60px;
  z-index: 4;
  margin-top: 10px;
  font-size: 1.1em;
  color: #435f7a;
  opacity: .5;
  cursor: pointer;
}
@media screen and (max-width: 735px) {
  .message-input .wrap .attachment {
    margin-top: 17px;
    right: 65px;
  }
}

.message-input .wrap .attachment:hover {
  opacity: 1;
}

.message-input .wrap button {
  float: right;
  border: none;
  width: 50px;
  padding: 12px 0;
  cursor: pointer;
  background: #32465a;
  color: #f5f5f5;
}
@media screen and (max-width: 735px) {
  .message-input .wrap button {
    padding: 16px 0;
  }
}

.message-input .wrap button:hover {
  background: #435f7a;
}

.message-input .wrap button:focus {
  outline: none;
}
</style>

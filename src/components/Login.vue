<template>
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Login</h3>
                    <div class="box">
                        <figure class="avatar">
                            <img src="https://image.flaticon.com/icons/svg/119/119070.svg">
                        </figure>
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" type="text" placeholder="ชื่อผู้ใช้" autofocus="" v-model="username">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" type="password" placeholder="รหัสผ่าน" v-model="password">
                                </div>
                            </div>
                            <button class="button is-block is-info is-large is-fullwidth" v-on:click="loginWeb()">เข้าสู่ระบบ</button>
                        </form>
                    </div>
                    <p class="has-text-grey" >
                        <a><router-link to="/Register">ผู้ป่วยใหม่</router-link></a> &nbsp;·&nbsp;
                        <a><router-link to="/">หน้าหลัก</router-link></a>
                    </p>
                </div>
            </div>
        </div>
</template>
<script>
import firebase from 'firebase'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
      hasprofile: {},
      users: ''
    }
  },
  methods: {
    ...mapActions({
      signIn: 'user/signIn'
    }),
    async loginWeb (e) {
      const dbRefObject = await firebase.database().ref().child('User')
      const dbReflist = await dbRefObject.child(this.username)
      dbReflist.on('child_added', snap => {
        this.hasprofile = snap.val()
        console.log(this.hasprofile)
      })
      console.log('data -> ', this.hasprofile)
      if (this.hasprofile !== null) {
        console.log(this.hasprofile.username, this.hasprofile.password)
        if (this.hasprofile.username === this.username && this.hasprofile.password === this.password) {
          const userSet = this.hasprofile.username
          const Per = this.hasprofile.Permistion
          console.log(userSet, Per)
          this.signIn({userSet, Per})
          if (this.hasprofile.Permistion === 3) {
            this.$router.push('/Homeadmin')
            alert('welcome back Administrator')
          } if (this.hasprofile.Permistion === 2) {
            this.$router.push('/Question')
            alert('welcome back Doctor')
          } if (this.hasprofile.Permistion === 1) {
            this.$router.push('/Question')
            alert('welcome to Online-medical-service')
          }
        }
        //  else alert('Username Or Password incorrect')
      } else {}
      this.hasprofile = {}
      this.username = ''
      this.password = ''
      alert('Username Or Password incorrect')
    }
  },
  computed: {
    ...mapGetters({
      user: 'users'
    }),
    isLoggedIn () {
      return 0
      //  return this.$store.getters.isLoggedIn
    },
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    const dbRefObject = firebase.database().ref().child('User')
    console.log(dbRefObject)
    dbRefObject.on('value', snap => {
      this.users = snap.val()
      console.log('boom')
      console.log(this.user)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,body {
  font-family:'Abel', sans-serif,'Mitr', sans-serif;
  font-size: 14px;
  font-weight: 300;
}
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
button {
  font-family:'Abel', sans-serif,'Mitr', sans-serif;
  font-size: 14px;
}
input {
  font-family:'Abel', sans-serif,'Mitr', sans-serif;
  font-size: 14px;
}
</style>

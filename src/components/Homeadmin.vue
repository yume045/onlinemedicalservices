<template>
  <div class="hello">
  <div>
</div><br><br>
<div style="margin-left:35%;">
  <b-nav-form>
        <h1>{{this.users}}</h1>
    </b-nav-form>
    </div>
        <form action="">
            <div class="columns">
                <br>
            </div>
                <div class="container">
                    <div class="row">
                    </div>
                </div>
        </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created: {
    user () {
      return this.$store.getters.user
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  mounted () {
    console.log(this.user)
  },
  computed: {
    ...mapGetters({
      users: 'user/user',
      Checklogin: 'user/isLoggedIn'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>

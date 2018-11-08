<template>
  <div class="hello">
      <table class="table table-hover">
  <thead>
    <div>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
    </div>
  </thead>
  <tbody>
    <div>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    </div>
  </tbody>
</table>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    console.log(this.user)
    const dbRefObject = firebase.database().ref().child('User')
    console.log(dbRefObject)
    dbRefObject.on('value', snap => {
      this.users = snap.val()
      console.log(this.users)
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

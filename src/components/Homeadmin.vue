<template>
  <div class="hello">
      <section class="container">
        <div class="columns">
          <div class="columns is-9">
            <div class="box content">
              <textarea type="text" id="form21" class="md-textarea form-control" rows="3" v-model="add"></textarea>
              <textarea type="text" id="form22" class="md-textarea form-control" rows="3" v-model="add1"></textarea>
            <br>
            <button class="btn btn-primary" @click="insertHomeadmin ()">Add</button>
            </div>
          </div>
        </div> <br>
          <div class="box content" :key="key" v-for="(subadd, key) in subadds">
          <h1>{{subadd.add}}</h1><br>
          {{subadd.add1}}
        </div>
      </section>
  <div>
</div><br><br>
<div style="margin-left:35%;">
  <b-nav-form>

    </b-nav-form>
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var homeadminRef = database.ref('/Homeadmin')
export default {
  name: 'Homeadmin',
  data () {
    return {
      add: '',
      add1: '',
      subadds: ''
    }
  },
  methods: {
    insertHomeadmin () {
      let tmp = ({
        add: this.add,
        add1: this.add1
      })
      homeadminRef.push(tmp)
      this.add = ''
      this.add1 = ''
    }
  },
  mounted () {
    homeadminRef.on('value', snap => {
      this.subadds = snap.val()
      console.log(this.subadds)
    })
  },
  created: {
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
</style>

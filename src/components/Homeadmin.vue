<template>
  <div class="hello">
      <section class="container">
        <div class="columns">
          <div class="columns is-9">
            <div class="box content">
              <input type="text" id="form21" class="md-textarea form-control" rows="3" v-model="add"><br>
              <textarea type="text" id="form22" class="md-textarea form-control" rows="3" v-model="add1"></textarea><br>
              <input type="text" name="" id="" class="md-textarea form-control" v-model="addpicture">
            <br>
            <button class="btn btn-primary" @click="insertHomeadmin ()">Add</button>
            </div>
          </div>
        </div> <br>
          <div class="box content" :key="key" v-for="(subadd, key) in subadds">
          <h1>{{subadd.add}}</h1><br>
              {{subadd.add1}}
              <div class="col-sm">
                  <b-card  title=""
                    img-src v-bind:src="subadd.addpicture"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;margin-left:0%;"
                    class="mb-2" >
                      <p class="card-text">
                        <img v-bind:src="subadd.addpicture" style="width: 400px; height: 400px;">
                      </p>
                      <p class="card-text">
                        {{subadd.add}}
                      </p>
                      <p class="card-text">
                        {{subadd.add1}}
                      </p>
              <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
    </div>
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
      subadds: '',
      addpicture: ''
    }
  },
  methods: {
    insertHomeadmin () {
      let tmp = ({
        add: this.add,
        add1: this.add1,
        addpicture: this.addpicture
      })
      homeadminRef.push(tmp)
      this.add = ''
      this.add1 = ''
      this.addpicture = ''
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

<template>
  <div class="hello">
<div style="margin-left:35%;">
<div class="row justify-content-center">
                        <div class="col-12 col-md-10 col-lg-8">
                            <form class="card card-sm">
                                <div class="card-body row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <i class="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div class="col">
                                        <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords">
                                    </div>
                                    <div class="col-auto">
                                        <button class="btn btn-lg btn-success" type="submit">Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
    </div>
<div>
  <br>
</div>
  <form action="">
    <div class="container">
      <div class="row">
          <div class="column is-one-third" :key="key" v-for="(subaddmedic, key) in subadds">
                <div class="col-sm">
                    <b-card  title=""
                        img-src v-bind:src="subaddmedic.addpicturemedic"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;margin-left:0%;"
                        class="mb-2" >
                        <p class="card-text">
                        <img v-bind:src="subaddmedic.addpicturemedic" style="width: 250px; height: 250px;">
                        </p>
                        <p class="card-text">
                        {{subaddmedic.addmedic.slice(0, 50)}}
                        </p>
                        <p class="card-text">
                        {{subaddmedic.addmedic2.slice(0, 50)}}
                        </p>
                        <b-button @click="select(subaddmedic.addmedic)" variant="primary" class="btn btn-outline-info">อ่านเพิ่มเติม</b-button>
                    </b-card>
                </div>
            </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters, mapActions } from 'vuex'
var database = firebase.database()
var medicenadminRef = database.ref('/Medicenadmin')
export default {
  name: 'Medicine',
  data () {
    return {
      subadds: '',
      subaddmedics: '',
      addpicture: '',
      addmedic: '',
      addmedic2: '',
      addpicturemedic: ''
    }
  },
  methods: {
    ...mapActions({
      selectNews: 'user/selectNews'
    }),
    select (addmedic) {
      this.selectNews(addmedic)
      this.$router.push('/Medicnews')
    }
  },
  mounted () {
    medicenadminRef.on('value', snap => {
      this.subadds = snap.val()
      console.log(this.subadds)
    })
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
.form-control-borderless {
    border: none;
}

.form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
    border: none;
    outline: none;
    box-shadow: none;
}
</style>

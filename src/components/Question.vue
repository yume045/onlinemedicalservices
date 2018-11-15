<template>
  <div class="hello">
  <div>
</div><br><br>
  <div class="container">
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item is-active">ดูคำถามทั้งหมด</a>
        <a class="navbar-item">ดูเฉพาะคำถามที่มีคำตอบทั้งหมด</a>
        <a class="navbar-item">ดูเฉพาะคำถามที่ยังไม่มีคำตอบทั้งหมด</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <input class="input" type="search" placeholder="Search forum...">
            </div>
            </div>
            </div>
            </div>
            <section class="container">
              <div class="columns">
                <div class="column is-3">
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">New Post</button>
                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="recipient-name" class="col-form-label">Recipient:</label>
                              <input type="text" class="form-control" id="recipient-name">
                            </div>
                            <div class="form-group">
                              <label for="message-text" class="col-form-label">Message:</label>
                              <textarea class="form-control" id="message-text"></textarea>
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Send message</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <aside class="menu">
                    <p class="menu-label">
                      Tags
                      </p>
                      <ul class="menu-list">
                        <li><span class="menu-label">Dashboard</span></li><br>
                        <li><span class="menu-label">Customers</span></li><br>
                        <li><span class="menu-label">Authentication</span></li><br>
                        <li><span class="menu-label">Payments</span></li><br>
                        <li><span class="menu-label">Transfers</span></li><br>
                        <li><span class="menu-label">Balance</span></li><br>
                        <li><span class="menu-label">Question</span></li>
                      </ul>
                  </aside>
                </div>
                <div class="column is-9">
                    <div class="box content">
                      <div class="md-form amber-textarea active-amber-textarea">
                        <i class="fa fa-pencil prefix"></i>
                        <textarea type="text" id="form22" class="md-textarea form-control" rows="3" v-model="question"></textarea>
                        <label for="form22"></label>
                      </div>
                        <form class="md-form">
                            <div class="file-field">
                                <div class="btn btn-primary float-left">
                                    <input type="file" multiple>
                                </div>
                                <button class="btn btn-primary " @click="insertQuestion ()">send</button>
                            </div>
                        </form>
                    </div>
                    <b-card>
                    <diV :key="key" v-for="(subquestion, key) in subquestions">
                      {{key}}
                      <diV :key="key" v-for="(subquestion, key) in subquestion">
                      <div v-if="updatekey === key" class="box content">
                        <div class="box content">
                          <input type="text" v-model="updatequestion"><br>
                        <button class="btn btn-primary" @click="Updatesub(key, updatequestion)">Save</button>
                        </div>
                    </div>
                     <div v-else class="box content">
                        <div class="box content">
                          {{subquestion.question}}
                          <div></div>
                        <button class="btn btn-primary" @click="Setupdate(key, subquestion.question)">Comment</button><br>
                        </div>
                    </div>
                      </diV>
                    </diV>
                    </b-card>
                  </div>
                </div>
            </section>
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var questionRef = database.ref('/Question')

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      updatekey: '',
      question: '',
      subquestions: '',
      picture: '',
      updatequestion: '',
      user: {}
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/user',
      Checklogin: 'user/isLoggedIn',
      permission: 'user/Per'
    })
  },
  methods: {
    insertQuestion () {
      let tmp = ({
        question: this.question
      })
      questionRef.child(this.question).push(tmp)
      this.question = ''
    },
    Setupdate (key, subquestion) {
      this.updatekey = key
      this.updatequestion = subquestion
      console.log(this.updatekey)
      console.log(key)
    },
    Updatesub (key, updatequestion) {
      questionRef.child(key).update({
        question: updatequestion
      })
      this.updatekey = ''
      this.updatequestion = ''
    }
  },
  mounted () {
    questionRef.on('value', snap => {
      this.subquestions = snap.val()
      console.log(this.subquestions)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

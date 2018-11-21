<template>
  <div class="hello">
  <div>
</div><br><br>
  <div class="container">
    <div class="navbar-menu">
      <div class="navbar-start">
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
                        <li><span class="menu-label"><a class="navbar-item is-active">ดูคำถามทั้งหมด</a></span></li><br>
                        <li><span class="menu-label"><a class="navbar-item">ดูเฉพาะคำถามที่มีคำตอบทั้งหมด</a></span></li><br>
                        <li><span class="menu-label"><a class="navbar-item">ดูเฉพาะคำถามที่ยังไม่มีคำตอบทั้งหมด</a></span></li><br>
                      </ul>
                  </aside>
                </div>
                <div class="column is-9">
                   <!-- <textarea type="text"  rows="3" v-model="data.question"></textarea>
                   <button class="btn btn-primary " @click="insertQuestion()">send</button> -->
                    <div class="box content">
                      <div class="md-form amber-textarea active-amber-textarea">
                        <i class="fa fa-pencil prefix"></i>
                        <textarea type="text" id="form22" class="md-textarea form-control" rows="3" v-model="data.question"></textarea>
                        <label for="form22"></label>
                      </div>
                      <div class="control">
                          <input type="file" name="resume" @change="onFileChange($event.target.files[0])">
                      </div>
                          <button class="btn btn-primary " @click="insertQuestion (users)">send</button>
                    </div>
                        <!--<diV :key="key" v-for="(subquestion, key) in subquestions">-->
                      <div class="box" :key="key" v-for="(subquestion, key) in subquestions">
                          <article class="media">
                            <div class="media-left">
                              <figure class="image is-64x64">
                                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                              </figure>
                            </div>
                            <div class="media-content">
                              <div class="content">
                                <p>
                                  <strong>{{subquestion.users}}</strong>
                                  <br>
                                  {{subquestion.question}}
                                </p>
                              </div>
                            </div>
                          </article>
                          <article class="media">
                            <div class="media-left">
                              <figure class="image is-64x64">
                                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                              </figure>
                            </div>
                            <div class="media-content">
                              <div class="content" :key="key1" v-for="(ans, key1) in subquestion.ans">
                                <p>
                                  <strong>{{ans.name}}</strong>
                                  <br>
                                  {{ans.ans}}
                                </p>
                              </div>
                                <div v-if = "comment === key">
                                  <input type="text" class="input is-hovered" v-model="ans">
                                  <div class="control">
                                    <button class="button is-info" @click="insert_ans (key,users)"><b-icon icon="check"></b-icon><span>ตอบกลับ</span></button>
                                  </div>
                                </div>
                                  <div v-else>
                                    <button class="btn btn-primary" @click="sw (key)">ตอบกลับ</button>
                                  </div>
                            </div>
                          </article>
                          </div>
                        <!--</div>-->
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
      data: {
        question: '',
        image: '',
        users: ''
      },
      ans: '',
      msg: 'Welcome to Your Vue.js App',
      updatekey: '',
      question: '',
      subquestions: '',
      picture: '',
      updatequestion: '',
      user: {},
      img: [],
      comment: ''
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
    onFileChange (fileImg) {
      this.dataImg = fileImg
    },
    createImage () {
      const storageRef = firebase.storage().ref('image/' + this.dataImg.name.toLowerCase().split(' ').join('-'))
      const uploadTask = storageRef.put(this.dataImg)
      return uploadTask
    },
    sw  (key) {
      this.comment = key
    },
    insert_ans (key, users) {
      var data = {
        ans: this.ans,
        name: users
      }
      questionRef.child(key + '/ans/').push(data)
      this.comment = ''
    },
    async insertQuestion (users) {
      this.data.users = users
      questionRef.push(this.data)
      let urlsImg = await this.createImage()
      firebase.database.ref('img').push(urlsImg.downloadURL)
      // let tmp = ({
      //   question: this.question
      // })
      // questionRef.child(this.question).push(tmp)
      // this.question = ''
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
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

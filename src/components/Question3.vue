<template>
  <div class="hello">
  <div>
</div><br><br>
  <div class="container">
    <div class="navbar-menu">
      <div class="navbar-start">
        </div>
          <div class="navbar-item">
                      <div class="row justify-content-center">
                            <form class="card card-sm">
                                <div class="card-body row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <i class="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div class="col">
                                        <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords"  v-model="search" @input="filter(search)">
                                    ยังไม่มีคนตอบ
                                    </div>
                                    <div class="col-auto">
                                    </div>
                                </div>
                            </form>
                        </div>
            </div>
            </div>
            </div>
            <section class="container">
              <div class="columns">
                <div class="column is-3">
                  <aside class="menu">
                      <ul class="menu-list">
                        <li><span class="menu-label"><a class="nav-link disabled" href="/#/Question">ดูคำถามทั้งหมด</a></span></li><br>
                        <li><span class="menu-label"><a class="nav-link disabled" href="/#/Question2">ดูเฉพาะคำถามที่มีคำตอบทั้งหมด</a></span></li><br>
                        <li><span class="menu-label"><a class="nav-link disabled" href="/#/Question3">ดูเฉพาะคำถามที่ยังไม่มีคำตอบทั้งหมด</a></span></li><br>
                        <label> คำถามยอดนิยม </label>
                        <div :key="key" v-for="(hit, key) in show">
                          {{hit.question}}
                        </div>
                        <label> คำถามจากผู้ป่วยท่านอื่น </label>
                        <div :key="key" v-for="(subquestion, key) in subquestions">
                          {{subquestion.question}}
                        </div>
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
                          <button class="btn btn-primary " @click="insertQuestion (users)">ส่งคำถาม</button>
                    </div>
                        <!--<diV :key="key" v-for="(subquestion, key) in subquestions">-->
                      <div class="box" :key="key" v-for="(subquestion, key) in subquestions" v-if="!showData.length > 0">
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
                                  <br>
                                  <img v-url={filename:subquestion.pic} width="300" height="350"/><br>
                                  <video v-url={filename:subquestion.pic} />
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
                                    <button class="button is-info" @click="insert_ans (subquestion.key,users)"><b-icon icon="check"></b-icon><span>ตอบกลับ</span></button>
                                  </div>
                                </div>
                                  <div v-else>
                                    <button class="btn btn-primary" @click="sw (key)">ตอบกลับ</button>
                                  </div>
                            </div>
                          </article>
                          </div>
                      <div class="box" :key="key" v-for="(subquestion, key) in showData" v-if="showData.length > 0">
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
                                  <br>
                                  <img v-url={filename:subquestion.pic} width="300" height="350"/><br>
                                  <video v-url={filename:subquestion.pic} />
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
                                    <button class="button is-info" @click="insert_ans (subquestion.key,users)"><b-icon icon="check"></b-icon><span>ตอบกลับ</span></button>
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
var storageRef = firebase.storage().ref()
var questionRef1 = database.ref('/Popularquesttion')
var questionRef2 = database.ref('/Popularquesttion')
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: {
        question: '',
        image: '',
        users: '',
        status: ''
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
      comment: '',
      search: '',
      showData: [],
      count: '',
      show: '',
      show2: ''
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
    async createImage () {
      // const storageRef = firebase.storage().ref('image/' + this.dataImg.name.toLowerCase().split(' ').join('-'))
      await storageRef.child(this.dataImg.name).put(this.dataImg)
      // const uploadTask = storageRef.put(this.dataImg)
      // return uploadTask
    },
    sw  (key) {
      this.comment = key
    },
    insert_ans (key, users) {
      var data = {
        ans: this.ans,
        name: users
      }
      this.data.status = 1
      questionRef.child(key + '/ans/').push(data)
      questionRef.child(key).update({
        status: 1
      })
    },
    async insertQuestion (users) {
      if (this.dataImg) {
        await this.createImage()
        this.data.users = users
        this.data.pic = this.dataImg.name
        this.data.status = 0
        questionRef.push(this.data)
      } else {
        this.data.users = users
        this.data.pic = ''
        this.data.status = 0
        questionRef.push(this.data)
      }
      //
      let getkey = ''
      let getsearch = ''
      const dbReflist = questionRef1.orderByChild('question').equalTo(this.data.question)
      dbReflist.on('child_added', snap => {
        getsearch = snap.val()
        getkey = snap.key
        console.log(getsearch)
      })
      if (getsearch === '') {
        console.log('showif')
        let tmp = ({
          question: this.data.question,
          count: 1
        })
        questionRef1.push(tmp)
        this.search = ''
      } else {
        let update = getsearch.count + 1
        questionRef1.child(getkey).child('count').set(update)
      }
      this.data.question = ''
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
    },
    filter (Search) {
      if (Search.length > 0) {
        this.showData = this.subquestions.filter(
          (user) => {
            if (user.question.toString().indexOf(Search) >= 0) {
              return user
            }
          }
        )
      } else {
        this.showData = []
      }
    }
  },
  mounted () {
    questionRef.orderByChild('status').equalTo(0).on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.subquestions = data
      console.log(this.subquestions)
    })
    questionRef1.orderByChild('count').limitToLast(5).on('value', snap => {
      this.show = snap.val()
      console.log(this.show)
    })
    questionRef2.on('value', snap => {
      this.show2 = snap.val()
      console.log(this.show2)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="InsertMedic">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="jumbotron bg-secondary container mt--300 shadow rounded">
      <div class="row">
        <h3>ยา</h3>
      </div>
      <div class="row">
        <div class="col-3 col-md-2 mt-2 text-right">เพิ่มข้อมูลยา :</div>
        <div class="col-5 col-md-4">
          <base-input
            alternative
            class="mb-3"
            placeholder="ชื่อยา"
            addon-left-icon="fa fa-medkit"
            type="text"
            v-model="payload.medicName"
          />
        </div>
        <div class="col-4 col-md-3">
          <base-input
            alternative
            class="mb-3"
            placeholder="ราคาต่อชิ้น"
            addon-left-icon="fa fa-hashtag"
            type="number"
            v-model="payload.price"
          />
        </div>
        <div class="col-12 col-md-3">
          <base-button type="primary" block @click="addMedic()">เพิ่มยา</base-button>
        </div>
      </div>
      <div class="row" v-if="showData">
        <div class="col-12">
          <table class="col-12 table table-hover">
            <thead class="thead-light">
              <th class="text-center">#</th>
              <th>รายการ</th>
              <th class="text-center">ราคา</th>
              <th class="text-center" v-if="getUser.type !== 'Member'">จัดการข้อมูล</th>
            </thead>
            <tbody>
              <tr
                v-for="(val,  index) in showData"
                :key="index"
                v-if="index < page * 10 && index >= page * 10 - 10"
              >
                <td class="text-center">{{index + 1}}</td>
                <td>{{val.value.medicName}}</td>
                <td class="text-center">{{val.value.price}}</td>
                <td class="text-center">
                  <base-button
                    @click="deleteMedic(val.key)"
                    type="danger"
                    size="sm"
                    icon="ni ni-fat-remove"
                  ></base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" @click="page--" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              :class="(val === page)?'page-item active':'page-item'"
              v-for="val in totalPage"
              :key="val"
            >
              <a class="page-link" @click="page = val">{{val}}</a>
            </li>
            <li class="page-item">
              <a class="page-link" @click="page++" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var medicRef = database.ref("/Medics");
export default {
  name: "InsertMedic",
  data() {
    return {
      payload: {
        medicName: "",
        price: 0
      },
      showData: null,
      page: 1,
      totalPage: [1]
    };
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  methods: {
    addMedic() {
      medicRef.push(this.payload);
      this.payload = {
        medicName: "",
        price: 0
      };
    },
    deleteMedic(key) {
      this.$swal({
        title: "คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่?",
        text: "Delelte it ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5e72e4",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$swal("Deleted!", "ลบข้อมูลสำเร็จแล้ว", "success");
          medicRef.child(key).remove();
          let count = 1;
          let index = 1;
          this.totalPage = [1];
          this.showData = [];
          medicRef.on("child_added", snap => {
            this.showData.push({ value: snap.val(), key: snap.key });
            if (index % 10 === 0) {
              count++;
              this.totalPage.push(count);
            }
            index++;
          });
        }
      });
    }
  },
  mounted() {
    let count = 1;
    let index = 1;
    this.totalPage = [1];
    this.showData = [];
    medicRef.on("child_added", snap => {
      this.showData.push({ value: snap.val(), key: snap.key });
      if (index % 10 === 0) {
        count++;
        this.totalPage.push(count);
      }
      index++;
    });
  }
};
</script>
<style>
</style>

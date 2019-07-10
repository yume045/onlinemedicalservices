<template>
  <div class="OrderMedic">
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
      <div class="row mb-3">
        <h3>ออกใบสั่งยา</h3>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-6">
          <base-input
            alternative
            class="mb-3"
            placeholder="USERNAME : ผู้ป่วย"
            addon-left-icon="ni ni-circle-08"
            type="text"
            v-model="user"
            v-on:keyup.enter="reRender = true"
            @focus="reRender = false"
            @blur="reRender = true"
          />
        </div>
      </div>
      <div class="row d-flex justify-content-center" v-if="reRender">
        <div class="col-4 col-md-4">
          <model-select :options="options" v-model="item" placeholder="เลือกยา"></model-select>
        </div>
        <div class="col-4 col-md-2">
          <base-input
            alternative
            class="mb-3"
            placeholder="จำนวน"
            addon-left-icon="fa fa-hashtag"
            type="number"
            v-model="count"
          />
        </div>
        <div class="col-4 col-md-4">
          <model-select :options="optionsUnit" v-model="itemUnit" placeholder="เลือกหน่วยนับ"></model-select>
        </div>
      </div>

      <div class="row d-flex justify-content-center" v-if="reRender">
        <div class="col-12 col-md-6">
          <base-button type="primary" block @click="addOrder()">เพิ่มยา</base-button>
        </div>
      </div>
      <div class="row d-flex justify-content-center mt-5">
        <ListMedic :userKey="user" v-if="reRender" />
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import { ModelSelect } from "vue-search-select";
import ListMedic from "@/main/components/ListMedic";
import "../assets/vendor/font-awesome/css/font-awesome.css";
var database = firebase.database();
var orderRef = database.ref("/OrderMedic");
var medicRef = database.ref("/Medics");
export default {
  name: "OrderMedic",
  data() {
    return {
      user: "",
      count: "",
      reRender: false,
      options: [],
      optionsUnit: [
        {
          value: "เม็ด",
          text: "เม็ด"
        },
        {
          value: "แคปซูล",
          text: "แคปซูล"
        },
        {
          value: "กล่อง",
          text: "กล่อง"
        },
        {
          value: "ขวด",
          text: "ขวด"
        },
        {
          value: "ชุด",
          text: "ชุด"
        }
      ],
      item: {
        value: "",
        text: "",
        price: ""
      },
      itemUnit: {
        value: "",
        text: "",
        price: ""
      }
    };
  },
  watch: {
    user: function() {}
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  methods: {
    addOrder() {
      if (this.item.value != "") {
        orderRef.child(this.user).push({
          medicName: this.item.text,
          price: this.item.price,
          count: this.count,
          unit: this.itemUnit.text
        });
      } else {
        this.$swal({
          type: "error",
          title: "ผิดพลาด",
          text: "กรุณาเลือกยา"
        });
      }

      this.medicName = "";
      this.price = "";
      this.count = "";
    }
  },
  mounted() {
    this.user = this.$route.query.id;
    medicRef.on("child_added", snap => {
      this.options.push({
        value: snap.key,
        text: snap.val().medicName,
        price: snap.val().price
      });
    });

    console.log(this.options);
  },
  components: {
    ListMedic,
    ModelSelect
  }
};
</script>
<style>
</style>

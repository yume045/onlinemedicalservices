<template>
  <div class="container text-center mt-5">
    <h1>Loading...</h1>
  </div>
</template>

<script>
export default {
  name: "Redirect",
  data() {
    return {
      path: this.$route.params.path,
      type: this.$route.params.type
    };
  },
  mounted() {
    if (this.type === "go") {
      this.$router.push("/" + this.path);
    } else if (this.type === undefined) {
      if (this.path === undefined) this.$router.push("/Home");
      else this.$router.push("/" + this.path + "/Home");
    } else {
      this.$router.push("/" + this.path + "/" + this.type);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

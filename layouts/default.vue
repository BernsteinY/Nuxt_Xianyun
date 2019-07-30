<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default {
  // 注册组件
  components: {
    Header,
    Footer
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

ul,
li,
ol {
  list-style: none;
}

em,
i {
  font-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>

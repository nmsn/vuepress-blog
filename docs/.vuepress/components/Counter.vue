<template>
  <input class="mark"></input>
</template>

<script>

export default {
  methods: {
    baiduLoad() {
      console.log(1)
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?6594ba1364804631f0a8fd4452766fed";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    },
  },
  beforeMount() {
    this.baiduLoad();
  },
}

</script>

<style scoped>
.mark {
  visibility: hidden;
}
</style>


<template>
  <div id="gitalk-container"></div>
</template>


<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

export default {
  mounted() {
    this.renderGitalk()
  },
  methods: {
    renderGitalk() {
      const gitalk = new Gitalk({
        clientID: 'b7b20f96965dba669ef8',
        clientSecret: '5781ec81ba8319c01fabc945a079e3a487701682',
        repo: 'github.com/nmsn',
        owner: 'NMSN',
        admin: 'NMSN',
        // id: location.pathname,      // Ensure uniqueness and length less than 50
        // distractionFreeMode: false  // Facebook-like distraction free mode
      });
      gitalk.render('gitalk-container');
    }
  }
}

</script>


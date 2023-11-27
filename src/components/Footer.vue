<script setup>
</script>

<template>
  <footer >
    <div id="branding">
      <img alt="Art Institute of Chicago logo" src="@/assets/art_institute_of_chicago_mini_logo.svg"/>
      <p>ART INSTITUTE CHICAGO</p>
    </div>
    <div id="social-media">
      <img class="footer-logo" alt="Youtube logo" src="@/assets/youtube_logo.svg" />
      <img class="footer-logo" alt="Twitter logo" src="@/assets/twitter_logo.svg" />
      <img class="footer-logo" alt="Instagram logo" src="@/assets/instagram_logo.svg" />
      <img class="footer-logo" alt="Art Institute of Chicago logo" src="@/assets/facebook_logo.svg" />
    </div>
  </footer>
</template>

<style scoped>
footer {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background: #1A0007;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top:32px;
  padding-bottom:32px;
}

#branding {
  grid-column: 2 / 6;
  justify-content: flex-start;
}

#social-media {
  grid-column: 6 / 12;
  justify-content: flex-end;
}

.footer-logo {
  width: 38px;
  height: 38px;
  border: 3px #FFF2F5 solid
}

footer > div {
  display: flex;
  color: white;
  align-items: center;
  column-gap: 10px;
}

#social-media > img {
  padding: 2px;
  border-radius: 15px;
}
</style>

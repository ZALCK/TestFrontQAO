<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute();
console.log(route.path==="/about");
const isAboutActive = computed(() => route.path==="/about");
const isGalleryActive = computed(() => route.path==="/gallery");
const isSearchActive = computed(() => route.path==="/search");
</script>

<template>
  <header>
    <img alt="Art Institute of Chicago logo" class="logo" src="@/assets/art_institute_of_chicago_logo.svg"/>
    <nav>  
      <RouterLink :class="{ tabselected: isGalleryActive }" to="/gallery">Acceuil</RouterLink>
      <RouterLink :class="{ tabselected: isSearchActive }" to="/search">Recherche</RouterLink>
      <RouterLink :class="{ tabselected: isAboutActive }" to="/about">A propos</RouterLink>
    </nav>
    <div id="auth-options">
      <a class="contained-button" href="default.asp" target="_blank">
        Connexion
      </a>
    </div>
  </header>
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, auto);
  background: #1A0007;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  padding-top:16px;
  padding-bottom:16px;
}

.logo {
  grid-column: 2;
  width: 99px;
  height: 99px;
}

nav {
  grid-column: 7 / 11;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

nav > a {
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
}

.tabselected {
  text-decoration-line: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 8px;
}

#auth-options {
  grid-column: 11;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.contained-button {
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
  background-color: #B20937;
  border-radius: 10px;
}
</style>

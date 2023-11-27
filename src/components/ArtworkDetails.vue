<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
console.log("Router params : " + route.params.id)
const artwork = ref([]);
axios.get(`https://api.artic.edu/api/v1/artworks/${route.params.id}?limit=15&fields=id,title,artist_title,image_id,description,dimensions,term_titles`)
  .then(function (response) {
    // handle success
    console.log("My response " + JSON.stringify(response.data.data));
    artwork.value = response.data.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
</script>

<template>
  <main>
    <div id="details-container">
        <div id="details-content">
          <img v-if="artwork.image_id !== null" id="artwork-image" :src="`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`" />
          <img v-else src="@/assets/default_image.png">
          <div id="artwork-details">
            <h1>{{ artwork.title }}</h1>
            <h2>{{ artwork.artist_title }}</h2>
            <p v-if="artwork.description !== null">{{ artwork.description }}</p>
            <h4 v-else>Description : ---</h4>
            <h4>Dimension : {{ artwork.dimensions }} </h4>
            <div id="term-titles">
              <h4>Term titles :</h4>
              <div id="term-titles-items">
                <p v-for="termtitles in artwork.term_titles" :class="term">{{ termtitles }}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

#details-container {
  grid-column: 2 / 12;
  column-gap: 20px;
}

#details-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 20px 0px;
  color: black;
}

h1, h4 {
  font-weight: bold;
}

#artwork-image {
  grid-column: 1 / 2;
  width: 100%;
  height: 85%;
}

#artwork-details {
  grid-column: 2 / 3;
  padding: 20px;
  text-align: justify;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

#term-titles {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: baseline;
  flex-wrap: nowrap;
}

#term-titles > h4 {
  width: 100px;
  word-break: keep-all;
}

#term-titles-items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 8px;
  padding-left: 10px;
}

.term {
  padding: 0px;
  background-color : #F1B5C5;
  border-radius: 10px;
}

#term-titles-items > p {
  display: block;
  padding: 10px;
  background-color: #F1B5C5;
  border-radius: 10px;
}
</style>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const artworks = ref([]);
const initalPageLink = ref('https://api.artic.edu/api/v1/artworks?limit=15&fields=id,title,artist_title,image_id');
const currentPage = ref(0);
const prevPageLink = ref(null);
const nextPageLink = ref(null);
const searchinput = ref("")


axios.get(initalPageLink.value)
  .then(function (response) {
    // handle success
    console.log("My response " + JSON.stringify(response.data));
    currentPage.value = response.data.pagination.current_page;
    nextPageLink.value = response.data.pagination.next_url;
    artworks.value = response.data.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

async function handleSearching(myevent) {
  if(myevent.target.value.trim() !== "") {
    axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${myevent.target.value.trim()}?limit=15&fields=id,title,artist_title,image_id`)
    .then(function (response) {
      // handle success
      console.log("My response " + JSON.stringify(response.data));
      currentPage.value = response.data.pagination.current_page;
      nextPageLink.value = response.data.pagination.next_url;
      artworks.value = response.data.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
}
async function handlePrevClicked() {
  await axios.get(prevPageLink.value)
  .then(function (response) {
    // handle success
    console.log("My response " + JSON.stringify(response.data));
    artworks.value = response.data.data;
    if(response.data.pagination.current_page == 1) {
      prevPageLink.value = null;
    } else {
      prevPageLink.value = response.data.pagination.prev_url;
      currentPage.value = response.data.pagination.current_page;
      nextPageLink.value = response.data.pagination.next_url;
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

async function handleNextClicked() {
  await axios.get(nextPageLink.value)
  .then(function (response) {
    // handle success
    console.log("My response " + JSON.stringify(response.data));
    artworks.value = response.data.data;
    if(response.data.pagination.current_page == response.data.pagination.total_pages) {
      nextPageLink.value = null;
    } else {
      prevPageLink.value = response.data.pagination.prev_url;
      currentPage.value = response.data.pagination.current_page;
      nextPageLink.value = response.data.pagination.next_url;
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function handleArtworkClicked(artwork) {
  router.push({
    name: 'artworkdetails',
    params: {
        id: artwork.id
    }});
}
</script>

<template>
  <main>
    <div id="browsing-toolbar">
      <input type="text" @change="(event) => handleSearching(event)" v-model="searchinput" id="search-input" placeholder="Tapez et appuyer sur entrer"/>
      <div id="pagination">
        <div v-if="prevPageLink !== null" @click="handlePrevClicked" class="pagination-button">
          <img alt="Next page" src="@/assets/prev.png"/>
        </div>
        <div id="pagination-selected">{{ currentPage }}</div>
        <div v-if="nextPageLink !== null" @click="handleNextClicked" class="pagination-button">
          <img alt="Previous page" src="@/assets/next.png"/>
        </div>
      </div>
    </div>
    <div id="gallery">
      <div id="gallery-grid">
        <div @click="() => handleArtworkClicked(artwork)" v-for="artwork in artworks" class="card-container">
          <img v-if="artwork.image_id !== null" class="card-image" :src="`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`">
          <img v-else class="card-image" src="@/assets/default_image.png">
          <div class="card-footer">
            <p class="artwork-name">{{ artwork.title }}</p>
            <p v-if="artwork.artist_title !== null" class="author-name">{{ artwork.artist_title }}</p>
            <p v-else class="author-name"> --- </p>
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
  grid-template-rows: auto 1fr;
}

#browsing-toolbar {
  grid-column: 2 / 12;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0px;
}

#search-input {
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #F1B5C5;
}

#pagination {
  display: flex;
  column-gap: 5px;
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #FFF2F5;
  border-radius: 10px;
  border: 1px #B20937 solid;
}

#pagination-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  width: 30px;
  height: 30px; 
  background: #B20937;
  border-radius: 10px
}

#gallery {
  grid-column: 2 / 12;
  padding: 20px 0px;
}

#gallery-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  row-gap: 20px;
}

.card-container {
  display: flex;
  width: 217px;
  height: 260px;
  position: relative;
  border-radius: 10px;
}

.card-container:hover {
  border-bottom: ridge;
}

.card-image {
  box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  height: 100%;
}

.card-footer {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 15px;
  padding-bottom: 5px;
  width: 100%;
  bottom: 0px; 
  position: absolute;
  background: rgba(25.50, 0, 6.80, 0.60);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.card-footer > p {
  font-size: 14px;
  font-family: Poppins;
  font-weight: 500;
  word-wrap: break-word
}

.artwork-name {
  color: #FFF2F5;
}

.author-name {
  color: #F1B5C5;
}

</style>
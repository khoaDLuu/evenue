<template>
  <div>
    <h1>New Venue</h1>
    <input type="text" v-model="name" placeholder="Venue name">
    <input type="text" v-model="description" placeholder="Venue description">
    <button @click="createVenue">Create Venue</button>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createVenue } from '../graphql/mutations';

export default {
  name: 'venue',
  data() {
    return {
      name: '',
      description: ''
    }
  },
  methods: {
    async createVenue() {
      const { name, description } = this;
      if (!name || !description) return;
      const venue = { name, description };
      await API.graphql({
        query: createVenue,
        variables: {input: venue},
      });
      this.name = '';
      this.description = '';
    }
  }
};
</script>

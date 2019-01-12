<template>
  <div class="control">
    <b-tag type="is-dark" attached closable @close="remove">{{ category.name }}</b-tag>
  </div>
</template>

<script>
export default {
  props: ['category'],
  methods: {
    remove() {
      this.$store.dispatch('removeCategory', { id: this.category.id })
    }
  }
}
</script>


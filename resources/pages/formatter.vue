<template>
  <div>
    <h1 class="title">{{ $t('common.formatting') }}</h1>
    <a class="button is-link is-rounded my-15" @click="addNew">{{ $t('formatter.add_new') }}</a>
    <div class="block" v-for="(element, index) in actions" :key="index">
      <hr>
      <a class="delete" @click="remove(element, index)"></a>
      <b-radio v-model="element.action" type="is-dark" native-value="crop">{{ $t('formatter.delete_text') }}</b-radio>
      <b-radio v-model="element.action" type="is-dark" native-value="ignore">{{ $t('formatter.ignore') }}</b-radio>
      <b-radio v-model="element.action" type="is-dark" native-value="assign">{{ $t('formatter.assign') }}</b-radio>

      <div class="columns">
        <div class="column is-half">
          <b-field>
            <b-input :placeholder="$t('formatter.search_phrase')" type="text" class="mt-15" v-model="element.match"></b-input>
          </b-field>
        </div>
        <div class="column" v-if="element.action === 'assign'">
          <b-select
            :placeholder="$t('common.no_category')"
            class="mt-15"
            v-model="element.additional_data.category_id"
          >
            <option
              v-for="option in categories"
              :value="option.id"
              :key="option.id"
            >{{ option.name }}
            </option>
          </b-select>
        </div>
        <div class="column">
          <a
            class="button is-warning mt-15"
            v-if="element.id && canBeSaved(element)"
            @click="update(element)"
          >{{ $t('common.edit') }}</a>
          <a
            class="button is-success mt-15"
            v-if="!element.id && canBeSaved(element)"
            @click="save(element)"
          >{{ $t('common.save') }}</a>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<style scoped>
  .my-15 {
    margin: 15px 0;
  }

  .block {
    margin-top: 10px;
  }

  .mt-15 {
    margin-top: 35px;
  }

  .delete {
    float: right;
    margin-right: 30px;
  }
</style>

<script>
  import { generatesId } from '../store/mixins'

  export default {
    computed: {
      categories() {
        return this.$store.getters.categories
      },
      actions() {
        return this.$store.state.actions.actions
      }
    },
    methods: {
      addNew() {
        this.actions.unshift({
          internal_id: this.generateId(),
          action: null,
          match: null,
          additional_data: {
            category_id: null
          }
        })
      },
      save(element) {
        this.$store.dispatch('saveAction', element)
      },
      update(element) {
        this.$store.dispatch('updateAction', element)
      },
      remove(element, index) {
        if (element.id) {
          this.$store.dispatch('deleteAction', element)
        } else {
          this.$store.commit(
            'setActions',
            this.actions.filter((element, i) => i !== index)
          )
        }
      },
      canBeSaved(element) {
        if (!element.action || !element.match) {
          return false
        }

        if (element.action === 'assign' && !element.additional_data.category_id) {
          return false
        }

        return true
      }
    },
    beforeMount() {
      this.$store.dispatch('getCategories')
      this.$store.dispatch('fetchActions')
    },
    mixins: [generatesId]
  }
</script>

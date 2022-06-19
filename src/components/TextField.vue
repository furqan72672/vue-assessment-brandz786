<template>
  <div class="size">
    <!--    <v-text-field v-if="type==='email'" :label="label" variant="outlined" hide-details="auto" density="compact" :value="modelValue" @input="$emit('update:modelValue',$event.target.value)"></v-text-field>-->
    <v-text-field :label="label" variant="outlined" hide-details="auto" density="compact"
                  :type="type==='email'?'email':type==='text'||show?'text':'password'"
                  :append-inner-icon="type==='email'||type==='text'?'':show?'mdi-eye':'mdi-eye-off'"
                  v-model="model" @input="$emit('updateModel',$event.target.value)"
                  @click:append-inner="toggleShow" :rules="rules" :error-messages="error"
                  :error="error.length>0"></v-text-field>
  </div>
</template>

<script>
import {ref} from "vue";
import * as validation from "@/utils/validators";

export default {
  name: "TextField",
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      validator(value) {
        return ['email', 'password','text'].includes(value)
      },
      default: 'email'
    },
    model: {
      type: [String, Number],
      default: ''
    },
    rule: Array,
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['updateModel'],
  setup(props, {emit}) {
    const show = ref(false)
    const rules = ref([])

    function toggleShow() {
      show.value = !show.value
    }

    //check prop and build rules to pass to textField
    function buildRulesList() {
      if (props.rule.length) {
        if (props.rule.includes('email')) rules.value.push(validation.email)
        if (props.rule.includes('required')) rules.value.push(validation.required)
        if (props.rule.includes('minimum')) rules.value.push(validation.minimum)
        console.log(rules.value)
      }
    }

    //call initially
    buildRulesList()
    return {
      show,
      toggleShow,
      rules
    }
  }
}
</script>

<style scoped>
.size {
  width: 30vw;
}
</style>

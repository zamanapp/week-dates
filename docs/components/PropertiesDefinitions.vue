<template>
    <div class="p-3 font-mono text-sm rounded-md bg-gray-300/15 dark:bg-black/15"> 
        <div :class="`font-semibold text-blue-500 dark:text-blue-300 ${ isFunction && argumentLists.length === 0 ? 'inline' : '' } ${ !isFunction ? 'inline' : ''}`"><span class="italic font-normal text-cyan-700 dark:text-cyan-300">{{ isConstructor ? 'new' : '' }}</span> {{ property }}<span class="text-gray-600 dark:text-gray-400">{{ isFunction ? '(' : '' }}</span></div>
        <ul v-if="argumentLists.length > 0" class=" text-gray-600 dark:text-gray-400 !list-none !list-outside">
          <li v-for="(arg, index) in argumentLists" :key="index" class="transition-all hover:p-1 hover:ring-2 hover:rounded-md w-fit ring-cyan-900/20 dark:ring-cyan-900">
            <Dropdown theme="twoslash" :disabled="arg.optional === false && arg.default === undefined">
                <span class="font-medium text-yellow-500 dark:text-yellow-100">{{ arg.name }}</span>
                <span class="dark:text-cyan-300 text-cyan-600" v-if="arg.optional">?</span>
                <span class="text-yellow-700 dark:text-yellow-300">: {{ arg.type }}</span>
                <span class="dark:text-lime-300 text-lime-600" v-if="arg.default !== undefined"> = {{ arg.default }}</span>
                <span  v-if="index < argumentLists.length - 1">, </span>
                <template #popper>
                  <div class="flex p-2 text-sm">
                    <div v-if="arg.optional">Optional</div>
                    <div v-if="arg.default" >Default: <span class="dark:text-lime-300 text-lime-600">{{ arg.default }}</span></div>
                  </div>
                </template>
            </Dropdown>
          </li>
        </ul>
        <Dropdown class="inline" theme="twoslash">
          <div v-if="isFunction" :class="`font-medium text-orange-600 dark:text-orange-300
           ${ argumentLists.length === 0 ? 'inline' : '' }`"><span class="text-gray-600 dark:text-gray-400">)</span>: {{ returnType }}</div>
          <span v-else  class="font-medium text-orange-600 dark:text-orange-300">: {{ returnType }}</span>
          <template #popper>
            <div class="flex p-2 text-sm">
              <div>{{ `${isFunction ? 'Return Type' : 'Type'}`  }}</div>
            </div>
          </template>
        </Dropdown>
</div>
</template>

<script setup lang="ts">
import { Dropdown } from 'floating-vue'
import { computed, ref } from 'vue'

const props = defineProps({
  property: {
    type: String,
    required: true
  }
})

const isFunction = computed(() => props.property.split('(').length > 1)
const returnType = ref('')
const property = ref('')
const argumentLists = ref<{
  name: string
  type: string
  optional?: boolean
  default?: string
}[]>([])
const isConstructor = ref(false)

if (isFunction.value) {
  returnType.value = props.property.split(')')[1].replaceAll(' ', '').replace(':', '')
  property.value = props.property.split('(')[0]
  isConstructor.value = property.value.includes('new')
  if (isConstructor.value) {
    property.value = property.value.replace('new', '').trim()
  }
  const argumentsArray = props.property.split('(')[1].split(')')[0]
  if (argumentsArray.length > 0) {
    argumentLists.value = argumentsArray.split(',').map((a: string) => {
    const parts = a.split(':')
    const arg = parts[0]
    const type = parts[1].split('=')[0]
    const defaultV = parts[1].split('=')[1]
    const isOptional = arg.includes('?')
    return {
      name: isOptional ? arg.replace('?', '') : arg,
      type,
      optional: isOptional,
      default: defaultV
    }
  })
  }
} else {
  const parts = props.property.split(':')
  property.value = parts[0]
  returnType.value = parts[1]
}

</script>
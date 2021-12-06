<template>
  <amplify-authenticator :authConfig="configurationOptions">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

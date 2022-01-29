<template>
  <amplify-authenticator :authConfig="configurationOptions">
    <p>Hello World!</p>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

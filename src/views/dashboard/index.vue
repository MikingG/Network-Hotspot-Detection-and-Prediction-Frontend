<template>
  <div>
        <vue-typed-js style="margin-left: 20px;" class="mao" :strings="['丰富活动等你参与', '海量社团等你选择','欢迎你登录中山大学社团招新系统']">
          <h3 class="typing" />
        </vue-typed-js>
        <div style="margin-left: 20px;">
        <p>Username: {{ name }}</p>
        <p>Is Staff: {{ isStaff }}</p>
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      name: state => state.user.name,
      isStaff: state => state.user.is_staff
    })
  }
}
</script>

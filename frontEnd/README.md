## 1）vuex概述
Vuex是实现组件全局状态管理的一种机制，可以方便的实现组件之间数据共享。
## 2）基本使用
1、安装Vuex
`npm install vuex -S`  
2、创建Vuex实例对象
```vue
export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```
3、向Vue实例上挂载vuex
```vue
Vue.use(Vuex)
```
## 3）核心概念
```vue
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```
##### 1、state
提供唯一公共数据源，所有共享的数据都统一放在Store的state中。
###### （1）获取state的第一种方式
`this.$store.state.状态`
###### （2）获取state的第二种方式
通过vuex提供的mapState方法，将state中的状态映射为computed的属性来使用。
```vue
<template>
    <div>{{ count }}</div>
</template>

import { mapState } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Addtion",
  computed: {
    ...mapState(["count"]),
  },
};
```
##### 2、Mutation
Mutation用于修改store中的数据。
###### 1）调用的第一种方式
（1）在mutations中定义修改store中数据的方法。
```vue
mutations: {
    add(state, step) {
      state.count+=step
    },
    sub(state) {
      state.count--
    }
  }
```
（2）页面中通过this.$store.commit('方法名', payload)来调用方法。
```vue
this.$store.commit('add', 3)
```
###### 		2）调用的第二种方式
（1）使用vuex提供的mapMutations方法，将其映射为methods中的方法。
```vue
import { mapMutations } from "vuex";

  methods: {
    ...mapMutations(['add']),
  },
```
（2）直接调用映射的方法并传递需要的参数。
```vue
methods: {
    addNum() {
      this.add(3)
    }
  },
```
##### 3、Action
Action用于处理异步任务。（通过异步任务处理数据必须在Action中处理，但是Action中依旧是要通过处理Mutation来间接更新数据）
###### 1）actions中定义异步任务，其中需要调用mutations中的方法更新数据。
```vue
actions: {
    addSyc(context, step) {
      setTimeout(() => {
        context.commit('add', step)
      })
    }
  }
```
###### 		 2）触发异步任务
###### 1、触发异步任务的第一种方式
页面上通过this.$store.dispatch('方法名', payload)来调用异步方法
```vue
this.$store.dispatch('addSyc', 3)
```
###### 2）触发异步任务的第二种方式
通过vuex提供的mapActions方法，将actions中的状态映射为methods的属性来使用。
```vue
import { mapState, mapActions } from "vuex";

  methods: {
    // ...mapMutations(['add']),
    ...mapActions(['addSyc']),
  }
```
##### 4、Getter
Getter用于对state中的数据进行加工处理，不会修改state中的数据，而是返回一个新的数据。（store中的数据发生变化时，Getter中的数据也会跟着变化，类似于Vue中的computed）
定义getter:
```vue
getters: {
    newCount(state) {
      return `当前返回的state值为${state.count}`
    }
}
```
###### （1）使用getter中数据的第一种方式
```vue
this.$store.getters.newCount
```
###### （2）使用getter中数据的第二种方式
通过vuex提供的mapGetters方法，将getters中的值映射为computed的属性来使用。
```vue
import { mapGetters } from "vuex";

  computed: {
    ...mapGetters(['newCount']),
  }
```

<template>
  <div class="input-number" :class="view.styleClass" v-stream:mousedown="start$">
    {{value}}
  </div>
</template>

<script>
import { Subject, Observable } from 'rxjs'
import {
  tap,
  takeUntil,
  switchMap,
  pluck,
  distinctUntilChanged,
  map
} from 'rxjs/operators'
export default {
  name: 'InputNumber',

  data() {
    return {
      value: 100
    }
  },

  methods: {
    update(p0, p1) {
      console.log(Math.round((p0.clientY - p1.clientY) / 10))
      this.value += Math.round((p0.clientY - p1.clientY) / 50)
    },
    setCursor() {
      document.body.classList.add('moving')
    },
    clearCursor() {
      document.body.classList.remove('moving')
    }
  },

  states: {
    INIT: {
      styleClass: ''
    },
    MOVING: {
      styleClass: 'moving'
    }
  },

  stateMachine: {
    init: 'INIT',
    transitions: {
      INIT: {
        start: 'MOVING'
      },
      MOVING: {
        stop: 'INIT'
      }
    },
    actions() {
      const setMethod = f => {
        return [tap(({ data }) => f(data))]
      }
      return [
        ['*', 'start', setMethod(this.setCursor)],
        ['*', 'stop', setMethod(this.clearCursor)]
      ]
    }
  },

  subscriptions() {
    this.start$ = new Subject()
    return {
      start: this.start$.pipe(
        pluck('event'),
        tap(_ => this.$fsm.signal('start')),
        switchMap(p0 => {
          const stop$ = Observable.fromEvent(window, 'mouseup').pipe(
            tap(_ => this.$fsm.signal('stop'))
          )
          return Observable.fromEvent(window, 'mousemove').pipe(
            tap(p1 => this.update(p0, p1)),
            takeUntil(stop$)
          )
        })
      ),
      view: this.$fsm.state$.pipe(
        distinctUntilChanged(),
        map(state => this.$options.states[state])
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.input-number
  font-size: 28px
  display: flex
  background: #ccc
  padding: 8px 16px
  border-radius: 4px
  width: 70px
  justify-content: flex-end
.moving
  user-select: none
  color: brown
</style>

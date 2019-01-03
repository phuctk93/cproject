<template>
  <div>
  <draggable v-model="cards" @start="drag=true" @end="drag=false">
    <transition-group class="layout row wrap" name="list-complete">
      <v-flex v-for="(e, i) in cards" :key="e.id" :class="'list-complete-item xs12 md' + e.size">
        <v-card>
            <v-card-title>
              <span>{{e.name}}</span>
              <v-spacer></v-spacer>
            <v-btn icon @click="toggle(i)">
              <v-icon>{{ e.show ? 'remove' : 'add' }}</v-icon>
            </v-btn>
            </v-card-title>
          <v-card-text v-if="e.name == 'Manpower' && e.show">
            <manpower></manpower>
          </v-card-text>
          <v-card-text v-else-if="e.name == 'Muster' && e.show">
            <omuster v-on:changeMeter="changeMeter"></omuster>
          </v-card-text>
          <v-card-text v-else-if="e.name == 'Map and activity' && e.show">
            <activity></activity>
          </v-card-text>
          <v-card-text v-else-if="e.name == 'Victims' && e.show">
            <victim></victim>
          </v-card-text>
          <v-card-text v-else-if="e.name == 'Support Requisition' && e.show">
            <support></support>
          </v-card-text>
          <v-card-text v-else-if="e.name == 'Incident' && e.show">
            <incident></incident>
          </v-card-text>
        </v-card>
      </v-flex>
    </transition-group>
  </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import omuster from '../components/overview/Muster.vue'
  import manpower from '../components/overview/Manpower.vue'
  import incident from '../components/overview/Incident.vue'
  import victim from '../components/overview/Victim.vue'
  import support from '../components/overview/Support.vue'
  import activity from '../components/overview/Activity.vue'
  export default {
    components: {
      draggable,
      manpower,
      omuster,
      victim,
      support,
      incident,
      activity
    },
    computed: {
      cards: {
        get() {
           return this.$store.state.overview.cards
        },
        set(value) {
          this.$store.commit('moveCards', value)
        }
      }
    },
    data: () => ({
      
    }),
    methods: {
      toggle(i) {
        this.$store.commit("toggleCard", i)
      },
      changeMeter() {
        //Muster card
        this.cards.find(card => card.id == 1).size = 12
      }
    }
  }
</script>

<style>
.list-complete-item {
  transition: all 0.5s;
}

.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
}

</style>


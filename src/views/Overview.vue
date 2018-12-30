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
            <v-layout wrap>
              <v-flex xs12 md2>
                <toggle type="o-map-l"></toggle>
              </v-flex>
              <v-flex xs12 md6>
                <dragcamera
                @click="activity.dialog = true"
                :cameras="activity.cameras"
                :circles="activity.circles">
                </dragcamera>
              </v-flex>
              <v-flex xs12 md4>
                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn class="primary d-block">Filter icon</v-btn>
                    <toggle all multilple type="o-map-h"></toggle>
                    <toggle all multilple type="o-map-t"></toggle>
                    <toggle all multilple type="o-map-a"></toggle>
                  </v-card-title>
                  <v-card-text id="activity-list">
                    <div v-for="(item, i) in activity.list" :key="'alist' + i" class="row">
                      <div class="d-flex wrap">
                        <b>{{ item.title }}</b>
                        <v-spacer></v-spacer>
                        <b>{{ item.date }}</b>
                      </div>
                      <div>{{ item.description }}</div>
                      <v-divider
                        v-if="i + 1 < activity.list.length"
                        :key="i"
                      ></v-divider>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
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
  <v-dialog v-model="activity.dialog">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="activity.dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <dragcamera
        :editable="true"
        :cameras="activity.cameras"
        :circles="activity.circles">
        </dragcamera>
      </v-card-text>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import omuster from '../components/overview/Muster.vue'
  import dragcamera from '../components/DragCamera.vue'
  import toggle from '../components/Toggle.vue'
  import manpower from '../components/overview/Manpower.vue'
  import incident from '../components/overview/Incident.vue'
  import victim from '../components/overview/Victim.vue'
  import support from '../components/overview/Support.vue'
  export default {
    components: {
      draggable,
      manpower,
      omuster,
      dragcamera,
      victim,
      support,
      incident,
      toggle
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
      numbers: [
        {id: 1, name: "Manpower", show: false, size: 6, min_size: 6, max_size: 12},
        {id: 2, name: "Muster", show: false, size: 6, min_size: 6, max_size: 6},
        {id: 3, name: "Map and activity", show: false, size: 6, min_size: 6, max_size: 12},
        {id: 4, name: "Incident", show: false, size: 6, min_size: 6, max_size: 12},
        {id: 5, name: "Victims", show: false, size: 6, min_size: 6, max_size: 12},
        {id: 6, name: "Support Requisition", show: false, size: 6, min_size: 6, max_size: 12},
      ],
      muster: {
        currentSelect: 0,
        oldSelect: 0,
      },
      activity: {
        dialog: false,
        cameras: [{id: 0, link: "", cid: 0}],
        //Thanks for public viedo link at https://gist.github.com/jsturgis/3b19447b304616f18657
        circles: [
          {x: -61.10059, y: 36.291668, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"},
          {x: -67.148209, y: 203.35715, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"},
          {x: 264.7149, y: 167.07143, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"},
          {x: 4.6672826, y: 220.74405, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"},
          {x: 75.726807, y: 143.63692, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"},
          {x: 177.02443, y: 63.505955, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"},
          {x: 149.05418, y: 237.375, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}
        ],
        list: [
          { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
          { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
          { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
          { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
          { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
          { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"}
        ]
      },
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


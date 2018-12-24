<template>
  <div>
  <draggable v-model="numbers" @start="drag=true" @end="drag=false">
    <transition-group class="layout row wrap" name="list-complete">
      <v-flex v-for="e in numbers" :key="e.id" :class="'list-complete-item xs12 md' + e.size">
        <v-card>
            <v-card-title>
              <span>{{e.name}}</span>
              <v-spacer></v-spacer>
            <v-btn icon @click="toggle(e)">
              <v-icon>{{ e.show ? 'remove' : 'add' }}</v-icon>
            </v-btn>
            </v-card-title>
          <v-card-text v-if="e.name == 'Manpower' && e.show" id="manpower">
            <barchart
              v-for="(chart, i) in manpower.charts"
              :key="'chart' + i"
              :title="chart.title"
              :labels="chart.labels" 
              :range="chart.range" 
              :values="chart.values">
             </barchart>
          </v-card-text>
          <v-card-text v-else-if="e.name == 'Muster' && e.show">
            <v-layout wrap>
              <v-flex v-for="(chart, i) in muster.charts" :key="'meter' + i" :class="'xs' + chart.size">
                <meterchart 
                  :title="chart.title"
                  :max="chart.max"
                  :present="chart.present"
                  :away="chart.away"
                  :color="chart.color"
                  @click="changeMeter(i)"
                ></meterchart>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-text v-else-if="e.name == 'Map and activity' && e.show">
            <v-layout wrap>
              <v-flex xs12 md2>
                <v-layout wrap>
                  <v-flex v-for="(btn, i) in 9" :key="'a-btn' + i">
                    <v-btn class="primary" v-text="'Level' + i"></v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 md6>
                <dragcamera
                @click="activity.dialog = true"
                :cameras="activity.cameras"
                :circles="activity.circles">
                </dragcamera>
              </v-flex>
              <v-flex xs12 md4></v-flex>
            </v-layout>
          </v-card-text>
          <v-card-text v-else-if="e.show">
            {{e.content}}
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
  import barchart from '../components/Barchart.vue'
  import meterchart from '../components/Meterchart.vue'
  import dragcamera from '../components/DragCamera.vue'
  export default {
    components: {
      draggable,
      barchart,
      meterchart,
      dragcamera
    },
    data: () => ({
      numbers: [
        {id: 1, name: "Manpower", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        show: false, size: 6, min_size: 6, max_size: 6},
        {id: 2, name: "Muster", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        show: false, size: 6, min_size: 6, max_size: 6},
        {id: 3, name: "Map and activity", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        show: false, size: 6, min_size: 6, max_size: 12},
        {id: 4, name: "Incident", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        show: false, size: 6, min_size: 6, max_size: 6},
        {id: 5, name: "Victims", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.",
        show: false, size: 6, min_size: 6, max_size: 12},
        {id: 6, name: "Support Requisition", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.",
        show: false, size: 6, min_size: 6, max_size: 12},
      ],
      manpower: {
        charts: [
          {
            title: "Chart 1",
            values: [10, 20, 30, 50, 10],
            range: [0, 100],
            labels: ["position 1", "position 2", "position 3", "position 4", "position 5"]
          },
          {
            title: "Chart 2",
            values: [20, 10, 30],
            range: [0, 100],
            labels: ["position 1", "position 2", "position 3"]
          },
          {
            title: "Chart 3",
            values: [20, 10, 30],
            range: [0, 100],
            labels: ["position 1", "position 2", "position 3"]
          }
        ]
      },
      muster: {
        currentSelect: 0,
        oldSelect: 0,
        charts: [
          {
            title: "HU 1",
            max: 100,
            present: 80,
            away: 50,
            color: "#99f",
            size: 3
          },
          {
            title: "HU 2",
            max: 100,
            present: 50,
            away: 45,
            color: "#9f9",
            size: 3
          },
          {
            title: "HU 3",
            max: 100,
            present: 90,
            away: 50,
            color: "#f99",
            size: 3
          },
          {
            title: "HU 4",
            max: 100,
            present: 100,
            away: 50,
            color: "#9ff",
            size: 3
          },
        ]
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
        ]
      },
    }),
    methods: {
      toggle(e) {
        e.show = !e.show
        if (e.show){
          e.size = e.max_size
        } else {
          e.size = e.min_size
        }
      },
      changeMeter(index) {
        var m = this.muster
        this.numbers[1].size = 12
        if (index == m.currentSelect) {
          return
        }
        m.oldSelect = m.currentSelect
        m.currentSelect = index
        m.charts[m.oldSelect].size = 3
        m.charts[m.currentSelect].size = 12
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


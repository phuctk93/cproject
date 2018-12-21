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
          <v-card-text v-if="e.name == 'Manpower' && e.show">
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
              <v-flex v-for="(chart, i) in muster.charts" :key="'meter' + i" xs12 md3>
                <meterchart 
                  :title="chart.title"
                  :max="chart.max"
                  :present="chart.present"
                  :away="chart.away"
                  :color="chart.color"
                ></meterchart>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-text v-else-if="e.show">
            {{e.content}}
          </v-card-text>
        </v-card>
      </v-flex>
    </transition-group>
  </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import barchart from '../components/Barchart.vue'
  import meterchart from '../components/Meterchart.vue'
  export default {
    components: {
      draggable,
      barchart,
      meterchart
    },
    data: () => ({
      numbers: [
        {id: 1, name: "Manpower", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        show: false, size: 6, min_size: 6, max_size: 6},
        {id: 2, name: "Muster", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        show: false, size: 6, min_size: 6, max_size: 6},
        {id: 3, name: "Map and activity", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        show: false, size: 6, min_size: 6, max_size: 6},
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
          }
        ]
      },
      muster: {
        charts: [
          {
            title: "HU 1",
            max: 100,
            present: 80,
            away: 50,
            color: "#99f"
          },
          {
            title: "HU 2",
            max: 100,
            present: 50,
            away: 45,
            color: "#9f9"
          },
          {
            title: "HU 3",
            max: 100,
            present: 90,
            away: 50,
            color: "#f99"
          },
          {
            title: "HU 4",
            max: 100,
            present: 100,
            away: 50,
            color: "#9ff"
          },
        ]
      }
    }),
    methods: {
      toggle(e) {
        e.show = !e.show
        if (e.show){
          e.size = e.max_size
        } else {
          e.size = e.min_size
        }
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


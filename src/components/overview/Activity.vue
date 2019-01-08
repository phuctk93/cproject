<template>
	<v-layout wrap>
    <v-flex xs12 md2>
      <toggle type="o-map-l"></toggle>
    </v-flex>
    <v-flex xs12 md6>
      <dragcamera
      @click="dialog = true"
      :cameras="cameras"
      :circles="circles">
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
          <div v-for="(item, i) in list" :key="'alist' + i" class="row">
            <div class="d-flex wrap">
              <b>{{ item.title }}</b>
              <v-spacer></v-spacer>
              <b>{{ item.date }}</b>
            </div>
            <div>{{ item.description }}</div>
            <v-divider
              v-if="i + 1 < list.length"
              :key="i"
            ></v-divider>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
		<v-dialog v-model="dialog" scrollable>
			<v-card>
				<v-card-title>
					<v-toolbar card class="white">
						<v-spacer></v-spacer>
						<v-btn icon @click="dialog = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
				</v-card-title>
				<v-card-text>
					<dragcamera
					:editable="true"
					:cameras="cameras"
					:circles="circles">
					</dragcamera>
				</v-card-text>
			</v-card>
		</v-dialog>
  </v-layout>
</template>

<script>
import dragcamera from '../DragCamera.vue'
import toggle from '../Toggle.vue'
export default {
	name: "o-activity",
	components: {
    dragcamera,
    toggle
	},
	data: () => ({
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
	})
}
</script>

<template>
	<v-layout wrap>
		<v-flex xs12>
			<v-card>
				<v-card-title>
					<div class="marquee">
						<p v-for="(inc, i) in incidents" :key="i.name"
						:class="inc.playing ? 'scroll' : 'hide'"
						v-text="'[' + inc.name + '] ' + 'ON GOING - ' + inc.location + ' - ' + inc.start"
						>
						</p>
					</div>
				</v-card-title>
				<v-card-text>
					<v-layout wrap>
						<v-flex xs12 md8>
							<dragcamera
								@click="dialog = true"
								:cameras="cameras"
								:circles="circles"
								:map="housingMap">
							</dragcamera>
						</v-flex>
						<v-flex xs12 md4>
							<h2>Casualty reported ({{tableItems.length}})</h2>
							<v-data-table
								:headers="headers"
								:items="tableItems"
								:pagination.sync="pagination"
								:total-items="total"
								:loading="loading"
								class="elevation-1"
								>
								<template slot="items" slot-scope="props">
									<tr @click="dialog = !dialog">
										<td>{{ props.item.type }}</td>
										<td>{{ props.item.id }}</td>
										<td>{{ props.item.unit }}</td>
									</tr>
								</template>
							</v-data-table>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-dialog v-model="dialog">
			<v-card>
				<v-card-title>
					<v-toolbar card class="white">
						<v-spacer></v-spacer>
						<v-btn icon @click="dialog = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
				</v-card-title>
				<v-card-text class="pa-4">
					<dragcamera
					editable
					:cameras="cameras"
					:circles="circles"
					:map="housingMap"
					>
					</dragcamera>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
import dragcamera from "../components/DragCamera.vue"
export default {
	name: "incident-icon",
	props: {
		id: String
	},
	components: {
		dragcamera
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
		housingMap: require('../assets/housing.png'),
		incidents: [
			{ name: "Incident A", location: "Location A", start: "01/01/2019 03:00", playing: false },
			{ name: "Incident B", location: "Location B", start: "02/01/2019 06:00", playing: false },
			{ name: "Incident C", location: "Location C", start: "03/01/2019 09:00", playing: false }
		],
		total: 10,
    tableItems: [],
    loading: true,
    pagination: {},
    headers: [
			{ text: 'Type', value: 'type' },
			{ text: 'ID/NAME', value: 'id' },
			{ text: 'Unit', value: 'unit' },
		],
		currentScroll: 0,
		idInterval: 0
	}),
	mounted() {
		this.idInterval = setInterval( () => {
			var oldScroll = this.currentScroll
			if (this.currentScroll < this.incidents.length - 1) {
				this.currentScroll++
			} else {
				this.currentScroll = 0
			}
			this.incidents[this.currentScroll].playing = true
			this.incidents[oldScroll].playing = false
			console.log(this.currentScroll)
		}, 10000)
	},
	destroyed() {
		clearInterval(this.idInterval)
	},
	watch: {
    pagination: {
      handler () {
				this.tableItems = []
        this.fakeGetData(this.pagination.rowsPerPage)
      },
      deep: true
		}
	},
	methods: {
		fakeGetData(number) {
			this.loading = true
			setTimeout(() => {
				this.loading = false
				for (let i = 0; i < number; i++) {
					this.tableItems.push({
						value: false,
						type: "TYPE " + i,
						id: "Name " + i,
						unit: "Unit " + i,
					})
			}
			}, 1000)
		},
	}
}
</script>

<style>
.marquee {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
}
.hide {
	display: none;
}
.scroll {
  display: inline-block;
	padding-left: 100%;
	animation: marquee 10s linear 1;
}
@keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
}
</style>

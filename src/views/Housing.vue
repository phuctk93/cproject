<template>
	<v-layout wrap>
		<!-- Activity and map area -->
		<v-flex xs12 md8>
			<activity></activity>
		</v-flex>

		<!-- Muster area -->
		<v-flex xs12 md4>
			<muster :id="id"></muster>
		</v-flex>

		<!-- Event area -->
		<v-flex xs12 md8>
			<v-card>
				<v-card-title>
					<h1>Events </h1>
					<v-spacer></v-spacer>
					<v-menu
					ref="menu"
					:close-on-content-click="false"
					v-model="event.menu"
					:nudge-right="40"
					:return-value.sync="event.date"
					lazy
					transition="scale-transition"
					offset-y
					full-width
					min-width="290px"
					>
						<v-text-field
							slot="activator"
							v-model="dateFormated"
							prepend-icon="event"
							readonly
						></v-text-field>
						<v-date-picker v-model="event.date" no-title scrollable>
							<v-spacer></v-spacer>
							<v-btn flat color="primary" @click="event.menu = false">Cancel</v-btn>
							<v-btn flat color="primary" @click="saveDate(event.date)">OK</v-btn>
						</v-date-picker>
					</v-menu>
					<v-spacer></v-spacer>
					<v-btn class="primary" @click="add">Add</v-btn>
				</v-card-title>
				<v-card-text>
					<v-layout wrap>
						<v-flex xs12 md6>
							<evt v-on:edit="edit" v-on:drag="drag" :locations="event.locations" :list="event.list"></evt>
						</v-flex>
						<v-flex xs12 md6 class="text-xs-center">
							<h2>Up next</h2>
							<v-data-table
								:headers="event.headers"
								:items="event.list"
								class="elevation-1"
								>
								<template slot="items" slot-scope="props">
									<tr @click="event.dialog = !event.dialog">
										<td v-text="timeFormated(props.item.startTime).hour + ':' + timeFormated(props.item.startTime).minute"></td>
										<td>{{ props.item.location }}</td>
										<td>{{ props.item.name }}</td>
									</tr>
								</template>
							</v-data-table>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-flex>

		<!-- Filter area -->
		<v-flex xs12 md4>
			<hfilter></hfilter>
		</v-flex>

		<!-- Dialog area -->
		<v-dialog v-model="event.dialog" scrollable>
			<v-card>
				<v-card-title>
					<v-toolbar card class="white">
						<v-spacer></v-spacer>
						<v-btn icon @click="event.dialog = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
				</v-card-title>
				<v-card-text>
					<v-layout wrap>
						<v-flex xs12 md8 class="autoscroll">
							<evt :id="event.id" v-on:drag="drag" :locations="event.locations" :list="event.list"></evt>
						</v-flex>
						<v-flex xs12 md4>
							<v-card>
								<v-card-title>
									<h2>Event</h2>
								</v-card-title>
								<v-card-text>
									<hform :id="event.id" :hID="id"></hform>
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
import evt from '../components/Event.vue'
import hfilter from '../components/housing/Filter.vue'
import hform from '../components/housing/Form.vue'
import activity from '../components/housing/Activity.vue'
import muster from '../components/housing/Muster.vue'
export default {
	props: {
		id: String
	},
	components: {
		evt,
		hfilter,
		hform,
		activity,
		muster
	},
	data: () => ({
		event: {
			id: 0,
			dialog: false,
			date: new Date().toISOString().substr(0, 10),
			menu: false,
			list: [
				{ startTime: 10, endTime: 23, name: "Event name 1", location: "a", value: false },
				{ startTime: 9, endTime: 11, name: "Event name 2", location: "b", value: false },
				{ startTime: 0, endTime: 10, name: "Event name 3", location: "c", value: false },
				{ startTime: 9, endTime: 13, name: "Event name 4", location: "d", value: false }
			],
			locations: {
				"a": { title: "Location A", color: "#f99", id: 0 },
				"b": { title: "Location B", color: "#9f9", id: 1 },
				"c": { title: "Location C", color: "#99f", id: 2 },
				"d": { title: "Location D", color: "#ff0", id: 3 },
			},
			headers: [
				{ text: 'Time', value: 'startTime' },
				{ text: 'Location', value: 'location' },
				{ text: 'Acivity', value: 'name' },
			],
		},
	}),
	computed: {
		dateFormated() {
			var date = new Date(this.event.date)
			return this.$root.dateFormated(date).slice(0, 10) + ", " + date.toString().slice(0, 3)
		}
	},
	methods: {
		saveDate(date) {
			this.$refs.menu.save(date)
			this.event.list.reverse()
		},
		timeFormated(yourHour) {
			var h = Math.floor(yourHour)
			var m = Math.round((yourHour - h) * 60)
			var fm = m.toString()
			if (m < 10) {
				fm = '0' + m
			}
			return {
				hour: h,
				minute: fm
			}
		},
		drag(data) {
			var evt = this.event.list[data.i]
			var offset = evt.endTime - evt.startTime
			var svgPos = data.y / 30
			if (svgPos >= 0 && (svgPos + offset) < 24) {
				evt.startTime = data.y/30
				evt.endTime = offset + evt.startTime
			}

		},
		edit(i) {
			this.event.dialog = true
			this.event.id = i
		},
		add() {
			this.event.dialog = true
			this.event.id = 0
		}
	}
}
</script>

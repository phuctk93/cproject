<template>
	<v-card>
		<v-card-title>
			<h1>Events </h1>
			<v-spacer></v-spacer>
			<v-menu
			ref="menu"
			:close-on-content-click="false"
			v-model="menu"
			:nudge-right="40"
			:return-value.sync="date"
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
				<v-date-picker v-model="date" no-title scrollable>
					<v-spacer></v-spacer>
					<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
					<v-btn flat color="primary" @click="saveDate(date)">OK</v-btn>
				</v-date-picker>
			</v-menu>
			<v-spacer></v-spacer>
			<v-btn class="primary" @click="add">Add</v-btn>
		</v-card-title>
		<v-card-text>
			<v-layout wrap>
				<v-flex xs12 md6>
					<evt v-on:edit="edit" v-on:drag="drag" :locations="locations" :list="list" name="svg0"></evt>
				</v-flex>
				<v-flex xs12 md6 class="text-xs-center">
					<h2>Up next</h2>
					<v-data-table
						:headers="headers"
						:items="list"
						class="elevation-1"
						>
						<template slot="items" slot-scope="props">
							<tr @click="dialog = !dialog">
								<td v-text="timeFormated(props.item.startTime).hour + ':' + timeFormated(props.item.startTime).minute"></td>
								<td>{{ props.item.location }}</td>
								<td>{{ props.item.name }}</td>
							</tr>
						</template>
					</v-data-table>
				</v-flex>
			</v-layout>
		</v-card-text>
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
					<v-layout wrap>
						<v-flex xs12 md8 class="autoscroll">
							<evt :id="id" v-on:drag="drag" :locations="locations" :list="list" name="svg1"></evt>
						</v-flex>
						<v-flex xs12 md4>
							<v-card>
								<v-card-title>
									<h2>Event</h2>
								</v-card-title>
								<v-card-text>
									<hform :list="list" :id="id" :create="create" v-on:form="formEvt"></hform>
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
import evt from '../Event.vue'
import hform from './Form.vue'
export default {
	name: "h-event",
	components: {
		evt,
		hform
	},
	data: () => ({
		id: 0,
		create: false,
		dialog: false,
		date: new Date().toISOString().substr(0, 10),
		menu: false,
		list: [
			{ x: 0, startDate: "", endDate: "", startTime: 10, endTime: 23, name: "Event name 1", location: "a", contact: "H1", phone: "888", value: false },
			{ x: 0, startDate: "", endDate: "", startTime: 9, endTime: 11, name: "Event name 2", location: "b", contact: "H2", phone: "111", value: false },
			{ x: 0, startDate: "", endDate: "", startTime: 0, endTime: 10, name: "Event name 3", location: "c", contact: "H3", phone: "999", value: false },
			{ x: 0, startDate: "", endDate: "", startTime: 9, endTime: 13, name: "Event name 4", location: "d", contact: "H4", phone: "888", value: false }
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
	}),
	computed: {
		dateFormated() {
			var date = new Date(this.date)
			return this.$root.dateFormated(date).slice(0, 10) + ", " + date.toString().slice(0, 3)
		}
	},
	mounted() {
		this.list.forEach(e => {
			e.x = this.locationToPos(e.location)
			e.startDate = this.date
			e.endDate = this.date
		})
	},
	methods: {
		saveDate(date) {
			this.$refs.menu.save(date)
			this.list.reverse()
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
			var evt = this.list[data.i]
			var offset = evt.endTime - evt.startTime
			var svgPos = {x: data.x, y: data.y / 30}
			if (svgPos.y >= 0 && (svgPos.y + offset) < 24) {
				evt.startTime = svgPos.y
				evt.endTime = offset + evt.startTime
			}
			if (svgPos.x >= 40 && svgPos.x <= 380) {
				evt.x = svgPos.x
			}
		},
		edit(i) {
			this.dialog = true
			this.id = i
			this.create = false
		},
		add() {
			this.create = true
			this.dialog = true
			this.list.push({
				startTime: 0,
				endTime: 5,
				name: "New event",
				location: "a",
				value: false,
				x: this.locationToPos("a")
			})
			this.id = this.list.length - 1
		},
		formEvt(data) {
			switch (data.type) {
				case "date":
					this.setDateTime(data.id, data.did, data.value)
					break;
				case "select":
					var e = this.list[data.id]
					e.x = this.locationToPos(data.location)
					break;
				default:
					this.dialog = false
					this.list.splice(data.id, 1)
					this.id = 0
					break;
			}	
		},
		locationToPos(i) {
			return 40 + 100 * this.locations[i].id
		},
		setDateTime(id, number, value) {
			var e = this.list[id]
			switch (number) {
				case 0:
					e.startDate = value
					break;
				case 1:
					e.startTime = this.decodeTime(value)
					break;
				case 2:
					e.endDate = value
					break;
				case 3:
					e.endTime = this.decodeTime(value)
					break;
				default:
					break;
			}
		},
		decodeTime(str) {
			var h = parseInt(str.slice(0,2))
			var m = parseInt(str.slice(3, 5))
			m = m / 60
			return h + m
		}
	}
}
</script>

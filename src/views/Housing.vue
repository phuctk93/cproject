<template>
	<v-layout wrap>
		<v-flex xs12 md4></v-flex>
		<v-flex xs12 md4></v-flex>
		<v-flex xs12 md4></v-flex>
		<v-flex xs12 md8>
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
					<v-btn class="primary">Add</v-btn>
				</v-card-title>
				<v-card-text>
					<v-layout wrap>
						<v-flex xs12 md6>
							<evt v-on:edit="edit" v-on:drag="drag" :locations="locations" :list="events"></evt>
						</v-flex>
						<v-flex xs12 md6 class="text-xs-center">
							<h2>Up next</h2>
							<v-data-table
								:headers="headers"
								:items="events"
								class="elevation-1"
								>
								<template slot="items" slot-scope="props">
									<tr @click="dialog = !dialog">
										<td>{{ props.item.startTime }}</td>
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
		<v-flex xs12 md4></v-flex>
		<v-dialog v-model="dialog">
			<v-card>
				<v-card-title>
					<v-spacer></v-spacer>
					<v-btn @click="dialog = false" icon>
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<evt v-on:drag="drag" :locations="locations" :list="events"></evt>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
import evt from '../components/Event.vue'
export default {
	props: {
		id: String
	},
	components: {
		evt
	},
	data: () => ({
		dialog: false,
		date: new Date().toISOString().substr(0, 10),
    menu: false,
		headers: [
			{ text: 'Time', value: 'startTime' },
			{ text: 'Location', value: 'location' },
			{ text: 'Acivity', value: 'name' },
		],
		events: [
			{ startTime: 10, endTime: 23, name: "Event name", location: "a", value: false },
			{ startTime: 9, endTime: 11, name: "Event name", location: "b", value: false },
			{ startTime: 0, endTime: 10, name: "Event name", location: "c", value: false },
			{ startTime: 9, endTime: 13, name: "Event name", location: "d", value: false }
		],
		locations: {
			"a": { title: "Location A", color: "#f99" },
			"b": { title: "Location B", color: "#9f9" },
			"c": { title: "Location C", color: "#99f" },
			"d": { title: "Location C", color: "#ff0" },
		}
	}),
	computed: {
		dateFormated() {
			var date = new Date(this.date)
			return date.toJSON().slice(0,10).split('-').reverse().join('/') + ", " + date.toString().slice(0, 3)
		}
	},
	methods: {
		saveDate(date) {
			this.$refs.menu.save(date)
			this.events.reverse()
		},
		drag(data) {
			var evt = this.events[data.i]
			var offset = evt.endTime - evt.startTime
			evt.startTime = data.y/30
			evt.endTime = offset + evt.startTime
		},
		edit(i) {
			console.log(i)
			this.dialog = true
		}
	}
}
</script>

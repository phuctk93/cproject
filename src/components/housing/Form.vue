<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-layout wrap>
			<v-flex xs12>
				<v-text-field
				v-model="name"
				:rules="[v => !!v || 'Item is required']"
				label="Name"
				required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-select
				v-model="select"
				:items="location"
				:rules="[v => !!v || 'Item is required']"
				label="Location"
				required
				></v-select>
			</v-flex>
			<v-flex xs6 v-for="(item, i) in date" :key="'menu' + i">
				<v-menu
				:ref="'menu'+ i"
				:close-on-content-click="false"
				v-model="item.show"
				:nudge-right="40"
				:return-value.sync="item.value"
				lazy
				transition="scale-transition"
				offset-y
				full-width
				min-width="290px"
				>
					<v-text-field
					slot="activator"
					v-model="item.formated"
					:label="item.label"
					readonly
					></v-text-field>
					<v-date-picker v-if="i % 2 == 0" v-model="item.value" no-title scrollable>
						<v-spacer></v-spacer>
						<v-btn flat color="primary" @click="item.show = false">Cancel</v-btn>
						<v-btn flat color="primary" @click="save(i, item.value)">OK</v-btn>
					</v-date-picker>
					<v-time-picker v-else v-model="item.value">
						<v-spacer></v-spacer>
						<v-btn flat color="primary" @click="item.show = false">Cancel</v-btn>
						<v-btn flat color="primary" @click="save(i, item.value)">OK</v-btn>
					</v-time-picker>
				</v-menu>
			</v-flex>
			<v-flex xs12>
				<v-text-field
				v-model="contact"
				:rules="[v => !!v || 'Item is required']"
				label="contact"
				required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-text-field
				v-model="phone"
				:rules="[v => !!v || 'Item is required']"
				label="Phone number"
				mask="phone"
				required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-btn :disabled="!valid" @click="submit">submit</v-btn>
				<v-btn @click="clear">clear</v-btn>
			</v-flex>
		</v-layout>
  </v-form>
</template>

<script>
export default {
	name: "hform",
	data: () => ({
		name: "Event name",
		valid: false,
		location: [
			"Location A",
			"Location B",
			"Location C",
			"Location D"
		],
		select: "Location A",
		contact: "Your contact",
		phone: "1111111111",
		date: [
			//Start
			{ label: "Start date", show: false, value: new Date().toISOString().substr(0, 10), formated: "" },
			{ label: "Start time", show: false, value: "00:00", formated: "" },
			//End
			{ label: "End date", show: false, value: new Date().toISOString().substr(0, 10), formated: "" },
			{ label: "End time", show: false, value: "00:00", formated: "" }
		]
	}),
	methods: {
		submit() {

		},
		clear() {

		},
		formatedDate(date) {
			var d = new Date(date)
			return d.toJSON().slice(0,10).split('-').reverse().join('/')
		},
		save(index, value) {
			var date = this.date[index]
			if (index % 2 == 0) {
				date.formated = this.formatedDate(value)
			} else {
				date.formated = this.date[index].value
			}
			date.show = false
		}
	}
}
</script>

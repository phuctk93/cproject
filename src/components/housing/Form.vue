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
				<v-btn :disabled="!valid" @click="createOrSave()" class="primary" v-text="id ? 'Save' : 'Create'"></v-btn>
				<v-btn @click="cancelOrDel()" class="error" v-text="id ? 'Delete' : 'Cancel'"></v-btn>
			</v-flex>
		</v-layout>
		<v-dialog v-model="dialog" max-width="260px">
			<v-card>
				<v-card-text>
					<p v-if="!id">You are about to cancel creation of this event, will you like to proceed?</p>
					<p v-else>You are about to delete this event, will you like to proceed?”</p>
				</v-card-text>
				<v-card-actions>
					<v-btn @click="yesCancelOrDel" class="primary">YES</v-btn>
					<v-spacer></v-spacer>
					<v-btn @click="dialog = false">NO</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
  </v-form>
</template>

<script>
export default {
	name: "hform",
	props: {
		hID: String,
		id: Number
	},
	data: () => ({
		name: "Event name",
		dialog: false,
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
	mounted() {
		if (this.id) {
			var data = this.$store.state.housing[this.hID].events
			this.select = data[this.id].select
			this.name = data[this.id].name
			this.contact = data[this.id].contact
			this.phone = data[this.id].phone
		}
	},
	methods: {
		createOrSave() {

		},
		cancelOrDel() {
			this.dialog = true
		},
		yesCancelOrDel() {
			if (this.id) {
				//Del finction
				console.log("DEL event: " + this.id)
			}
			this.dialog = false
		},
		save(index, value) {
			var date = this.date[index]
			if (index % 2 == 0) {
				date.formated = this.$root.dateFormated(value).slice(0, 10)
			} else {
				date.formated = this.date[index].value
			}
			date.show = false
		}
	}
}
</script>

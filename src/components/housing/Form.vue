<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-layout wrap>
			<v-flex xs12>
				<v-text-field
				v-model="data.name"
				:rules="[v => !!v || 'Item is required']"
				label="Name"
				required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-select
				v-model="data.location"
				:items="locations"
				item-text="name"
				item-value="value"
				@change="$emit('form', {type: 'select', id: id, location: data.location})"
				:rules="[v => !!v || 'Item is required']"
				label="Location"
				required
				></v-select>
			</v-flex>
			<v-flex xs6 v-for="(item, i) in date" :key="'menu' + i">
				<v-menu
				ref="fmenu"
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
				v-model="data.contact"
				:rules="[v => !!v || 'Item is required']"
				label="contact"
				required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-text-field
				v-model="data.phone"
				:rules="[v => !!v || 'Item is required']"
				label="Phone number"
				mask="phone"
				required
				></v-text-field>
			</v-flex>
			<v-flex xs12>
				<v-btn :disabled="!valid" @click="createOrSave()" class="primary" v-text="!create ? 'Save' : 'Create'"></v-btn>
				<v-btn @click="cancelOrDel()" class="error" v-text="!create ? 'Delete' : 'Cancel'"></v-btn>
			</v-flex>
		</v-layout>
		<v-dialog v-model="dialog" max-width="260px">
			<v-card>
				<v-card-text>
					<p v-if="create">You are about to cancel creation of this event, will you like to proceed?</p>
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
		id: Number,
		list: Array,
		create: Boolean
	},
	data: () => ({
		name: "Event name",
		dialog: false,
		valid: false,
		locations: [
			{name: "Location A", value: "a"},
			{name: "Location B", value: "b"},
			{name: "Location C", value: "c"},
			{name: "Location D", value: "d"}
		],
		location: {name: "Location A", value: "a"},
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
	computed: {
		data() {
			var d = this.list[this.id]
			var startDate = this.date[0],
			startTime = this.date[1],
			endDate = this.date[2],
			endTime = this.date[3]

			//startDate.value = d.startDate
			startDate.formated = this.$root.dateFormated(startDate.value).slice(0, 10)

			//startTime.value = this.timeFormated(d.startTime)
			startTime.formated = this.timeFormated(d.startTime)

			//endDate.value = d.endDate
			endDate.formated = this.$root.dateFormated(endDate.value).slice(0, 10)

			//endTime.value = this.timeFormated(d.endTime)
			endTime.formated = this.timeFormated(d.endTime)
			return d
		}
	},
	methods: {
		createOrSave() {
			this.$store.commit("showNotify", {type: "success", mess: "SAVE: " + this.data.name + " successful"})
		},
		cancelOrDel() {
			this.dialog = true
		},
		yesCancelOrDel() {
			if (!this.create) {
				//Del finction
				this.$store.commit("showNotify", {type: "success", mess: "DEL: " + this.data.name + " successful"})
				this.$emit("form", {type: "del", id: this.id})
			} else {
				this.$emit("form", {type: "cancel", id: this.id})
			}
			this.dialog = false
		},
		save(index, value) {
			var date = this.date[index]
			this.$refs.fmenu[index].save(value)
			this.$emit("form", {type: "date", id: this.id, did: index, value: value})
			date.show = false
		},
		timeFormated(yourHour) {
			var h = Math.floor(yourHour)
			var m = Math.round((yourHour - h) * 60)
			var fm = m.toString()
			var fh = h.toString()
			if (m < 10) {
				fm = '0' + m
			}
			if (h < 10) {
				fh = '0' + h
			}
			return fh + ':' + fm
		}
	}
}
</script>

<template>
	<v-layout wrap>
		<v-flex>
			<v-btn v-if="all" :outline="!allBtn.active" color="blue" @click="toggleAll()" :dark="allBtn.active" small>{{allBtn.name}}</v-btn>
			<v-btn v-for="(btn, i) in list" :key="btn.name" @click="toggle(i)" color="blue" :outline="!btn.active" :dark="btn.active" small>
				{{btn.name}}
			</v-btn>
		</v-flex>
	</v-layout>

</template>

<script>
export default {
	name: "btn-toggle",
	props: {
		list: Array,
		type: String,
		all: Boolean,
	},
	data: () => ({
		allBtn: {
			name: "All",
			value: "all",
			active: true
		},
	}),
	methods: {
		toggle(i) {
			if (this.allBtn.active) {
				this.allBtn.active = false
			}
			this.$emit("toggle", { type: this.type, value: i})
		},
		toggleAll() {
			this.allBtn.active = true
			this.$emit("toggle", { type: this.type, value: "all"})
		}
	}
}
</script>

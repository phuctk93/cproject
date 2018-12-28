<template>
	<v-layout wrap>
		<v-flex xs12>
			<div v-for="(v, k) in locations" :key="k" class="ma-1 d-inline-block" style="height: 20px;">
				<svg class="mx-1 d-inline-block" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
					<rect width="20" height="20" x="10" y="10" :fill="v.color"></rect>
				</svg>
				<span>{{v.title}}</span>
			</div>
		</v-flex>
		<v-flex xs12>
			<svg id="svg" class="event" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" :viewBox="'0 0 500 720'">
			<line x1="0" y1="10" x2="100%" y2="10"></line>
			<line x1="20" y1="10" x2="20" :y2="750"></line>
			<text v-for="i in 24" :key="'l'+i" x="0" :y="i * 30">{{i - 1}}</text>
			<rect class="draggable" v-for="(e, i) in list" :key="'erect' + i"
			width="100" :height="30 * (e.endTime - e.startTime)"
			:x="40 + 120 * i" :y="20 + e.startTime * 30" :fill="locations[e.location].color"
			@mousedown="startDrag($event, i)" @mousemove="drag" @mouseup="endDrag" @mouseleave="endDrag">
			</rect>
			</svg>
		</v-flex>
	</v-layout>
</template>
<script>
export default {
	name: "evt",
	props: {
		list: Array,
		locations: Object
	},
	data: () => ({
		current: 0,
		selectedElement: null,
		dragging: false,
		startingPos: [],
		offset: {},
		svg: {}
	}),
	mounted() {
		this.svg = document.getElementById("svg")
	},
	methods: {
		startDrag(evt, i) {
			this.dragging = false
			this.startingPos = [evt.clientX, evt.clientY]
			this.selectedElement = evt.target
			this.current = i
			this.offset = this.getMousePosition(evt)
			this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null, "x"))
			this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null, "y"))
		},
		drag(evt) {
			if (!(evt.pageX === this.startingPos[0] && evt.pageY === this.startingPos[1])) {
        this.dragging = true
      }
			if(this.selectedElement && this.dragging) {
				evt.preventDefault()
				var pos = this.getMousePosition(evt)
				this.$emit("drag", {i: this.current, y: pos.y - this.offset.y, x: pos.x - this.offset.x})
			}
		},
		endDrag() {
			if (!this.dragging) {
				this.$emit("edit", this.current)
			}
			this.selectedElement = null
			this.dragging = false
			this.startingPos = []
		},
		getMousePosition(evt) {
			var CTM = this.svg.getScreenCTM();
			return {
				x: (evt.clientX - CTM.e) / CTM.a,
				y: (evt.clientY - CTM.f) / CTM.d
			};
		},
	}
}
</script>

<style>
.event {
	user-select: none;
}
.event line {
  stroke: #333;
  stroke-width: 1;
}
rect.draggable {
	cursor: move;
}
</style>

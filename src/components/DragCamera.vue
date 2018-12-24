<template>
	<v-layout wrap @click="$emit('click')">
		<v-flex xs12 md8>
			<svg
			xmlns:svg="http://www.w3.org/2000/svg"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 371.47501 247.12084"
			sodipodi:docname="house.svg">
				<g transform="translate(81.416069,-19.981247)">
					<image
					sodipodi:absref="housing.png"
					:xlink:href="require('../assets/housing.png')"
					width="371.47501"
					height="247.12083"
					id="image4644"
					x="-81.416069"
					y="19.981247" />
				</g>
				<g transform="translate(81.416069,-19.981247)">
					<circle v-for="(circle, i) in circles" :key="'circleCam' + i" r="12" :cx="circle.x" :cy="circle.y"
					stroke="#f09" stroke-width="1" :fill="circle.fill" :id="'c' + i"
					@drop="dropCamera(i)" @mouseover="circleOver(circle)" @mouseleave="circleLeave(circle)" @dragover="allowDrop">
					</circle>
				</g>
			</svg>
		</v-flex>
		<v-flex xs12 md4>
			<div v-for="(cam, i) in cameras" :key="'camera' + i" style="position: relative">
				<video v-if="cam.link" @dragstart="dragCamera(i)" :src="cam.link" type="video/mp4" controls style="width: 100%" :draggable="editable"></video>
				<div v-else-if="editable && !cam.link" @dragstart="dragCamera(i)" draggable="true" style="width: 100%; font-size: 3em; text-align: center; border: #777 dotted">
					Drag here
				</div>
				<v-btn v-if="editable" @click="addCamera()" class="primary">Add another camera</v-btn>
				<v-btn
					v-if="editable"
          color="red"
          dark
          small
          absolute
          right
					top
          fab
					@click="removeCamera(i)"
					style="right: -20px"
					:disabled="cameras.length <= 1"
        >
          <v-icon>remove</v-icon>
        </v-btn>
			</div>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	name: "dragcam",
	props: {
		editable: Boolean,
		cameras: Array,
		circles: Array
	},
	data: () => ({
		currentID: 0
	}),
	methods: {
		addCamera() {
			var i = this.cameras.length
			this.cameras.push({id: i, link: ""})
		},
		removeCamera(i) {
			var cam = this.cameras[i]
			if (cam.cid != null) {
				var oldC = this.circles[cam.cid]
				oldC.fill = "#fff"
				oldC.signed = false
			}
			this.cameras.splice(i, 1)
		},
		dragCamera(i) {
			this.currentID = i
		},
		dropCamera (i) {
			var id = this.currentID
			var cam = this.cameras[id]
			//Get and set properties in old circle
			if (cam.cid != null) {
				var oldC = this.circles[cam.cid]
				oldC.fill = "#fff"
				oldC.signed = false
			}
			//Get and set properties in new circle
			var c = this.circles[i]
			c.fill = "#f00"
			c.signed = true
			//Set props to camera with new circle
			cam.link = c.video
			cam.cid = i
		},
		circleOver (c) {
			if (!c.signed) {
				c.fill = '#ff0'
			}
		},
		circleLeave(c) {
			if (!c.signed) {
				c.fill = '#fff'
			}
		},
		allowDrop(e) {
			e.preventDefault()
		},
		//Convert inkscape position to real position
		inkScapeHelper(cx, cy) {
			var fx = -371.47501/2 + 12 + cx
			var fy = -247.12084/2 + 12 + cy
			return {x: fx, y: fy}
		}
	}
}
</script>


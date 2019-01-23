<template>
	<v-layout wrap @click="singleClick()">
		<v-flex xs12 md8>
			<svg ref="svg" @dblclick="zoom"
			xmlns:svg="http://www.w3.org/2000/svg"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 371.47501 247.12084"
			sodipodi:docname="house.svg">
				<g :transform="'translate(' + pos.x +',' + pos.y + ') scale('+ scale +')'">
					<image
					sodipodi:absref="housing.png"
					:xlink:href="map"
					width="371.47501"
					height="247.12083"
					id="image4644"
					x="-81.416069"
					y="19.981247" />
				<foreignObject v-for="(circle, i) in circles" :key="'circleCam' + i" :x="circle.x - 13" :y="circle.y - 13" width="26" height="26">
					<div :draggable="editable" @dragstart="dragCamera(i)">
						<svg width="26" height="26">
								<circle r="12" cx="13" cy="13"
								stroke="#f09" stroke-width="1" :fill="circle.fill" :id="'c' + i"
								@mouseover="circleOver(circle)" @mouseleave="circleLeave(circle)">
								</circle>
						</svg>
					</div>
				</foreignObject>
				</g>
			</svg>
		</v-flex>
		<v-flex xs12 md4>
			<div v-for="(cam, i) in cameras" :key="'camera' + i" style="position: relative">
				<video v-if="cam.link" @drop="dropCamera(i)" @dragover="allowDrop" :src="cam.link" type="video/mp4" controls style="width: 100%"></video>
				<div v-else-if="editable && !cam.link" @drop="dropCamera(i)" @dragover="allowDrop" style="user-select: none; width: 100%; font-size: 3em; text-align: center; border: #777 dotted">
					Drop here
				</div>
				<v-btn v-if="editable" @click="addCamera()" class="primary" :disabled="cameras.length >= 5">Add another camera</v-btn>
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
          <v-icon>close</v-icon>
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
		circles: Array,
		map: String
	},
	data: () => ({
		currentID: 0,
		doubleClick: false,
		scale: 1,
		pos: {x: 81.416069, y: -19.981247} //please open housing.svg to understand, It's set anchor to center of inkscape
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
			var cam = this.cameras[i]
			//Get and set properties in old circle
			if (cam.cid != null) {
				var oldC = this.circles[cam.cid]
				oldC.fill = "#fff"
				oldC.signed = false
			}
			//Get and set properties in new circle
			var c = this.circles[id]
			c.fill = "#f00"
			c.signed = true
			//Set props to camera with new circle
			cam.link = c.video
			cam.cid = id
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
		},
		singleClick() {
			setTimeout( () => {
				if (!this.doubleClick) {
					this.$emit("click")
				}
			}, 200)
		},
		zoom(evt) {
			this.doubleClick = true
			if (this.scale == 1) {
				this.scale = 2
				var mPos = this.getMousePosition(evt)
				this.pos.x = 81.416069 * this.scale + mPos.x * (1 - this.scale)
				this.pos.y = -19.981247 * this.scale + mPos.y * (1 - this.scale)
			} else {
				this.scale = 1
				this.pos = { x: 81.416069, y: -19.981247 }
			}
			setTimeout( () => {
				this.doubleClick = false
			}, 250)
		},
		getMousePosition(evt) {
			var CTM = this.$refs.svg.getScreenCTM();
			return {
				x: (evt.clientX - CTM.e) / CTM.a,
				y: (evt.clientY - CTM.f) / CTM.d
			};
		}
	}
}
</script>


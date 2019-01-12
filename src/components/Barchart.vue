<template>
	<div class="chart-svg text-xs-center">
	<h2>{{title}}</h2>
	<svg class="bar-chart" xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    :viewBox="'0 0 300 ' + height">
    <g v-for="(value, i) in values" :key="title + 'bar' + i">
      <text
      class="label"
      x="60"
      :y="1 + labelOffsetY(i)"
      text-anchor="end"
      >
        {{labels[i]}}
      </text>
      <rect
      x="70"
			rx="8"
			ry="8"
      :y="2 + labelLineOffsetY(i)"
      :width="barWith(value, 230)"
      :height="((height - 20) / values.length) - 4"
      >
        <animate attributeName="width" from="0" :to="barWith(value, 230)" dur="1s" />
      </rect>
      <text
      class="value"
      x="75"
      :y="1 + labelOffsetY(i)"
      text-anchor="start"
      >
        {{formatValue(values[i])}}
      </text>  
    </g>
    <line
      x1="0" :y1="height - 20"
      x2="300" :y2="height - 20"
    ></line>
    <line
      x1="65" y1="0"
      x2="65" :y2="height"
    ></line>
	</svg>
	</div>
</template>

<script>
export default {
  name: 'barchart',

  props: {
    title: {
      type: String,
      default: "title"
    },
    range: {
      type: Array,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    height: 100,
    offset: 20
  }),

  mounted() {
    this.height = this.offset * (this.values.length + 1)
  },

  methods: {
    labelOffsetY (index) {
      return this.offset / 2 + this.offset * index
    },
    labelLineOffsetY (index) {
      return this.offset * index
    },
    formatValue (value) {
      return value.toLocaleString('en')
    },
    barWith (value, fullWidth) {
      const ratio = (value - this.range[0]) / (this.range[1] - this.range[0])
      return ratio * fullWidth
    }
  }
}
</script>


<style>
div.chart-svg {
	display: block
}

.bar-chart {
	margin: 2px 5px 5px;
	width: calc(100% - 10px);
	height: auto; 
	font-size: 0.75rem; 
	overflow: hidden;
}

.bar-chart text {
  dominant-baseline: middle;
  fill: #000;
}
.bar-chart text.value {
  fill: white;
}
.bar-chart line {
  stroke: #333;
  stroke-width: 1;
}
.bar-chart rect {
  stroke-width: 0;
  fill: #1976d2 !important;
}
.bar-chart.title {
  color: #000;
  margin: 2px 5px 0;
  text-align: left;
  font-variant: small-caps;
  font-size: 1em;
}
</style>

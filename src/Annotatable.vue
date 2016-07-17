<template id="annotatable-template">
	<div class="annotatable" v-on:mousedown="beginDraw" v-on:mousemove="drawing" v-on:mouseup="drawn">
		<slot>请在此填充内容</slot>
		<annotation v-for="annotation in annotations" :props="annotation" :input="input" :options="options">
		</annotation>
		<outline v-if="newAnnotationDrawing" :props="newAnnotation"></outline>
	</div>
</template>

<script>
import Annotation from './Annotation.vue'
import Outline from './Outline.vue'
import {randomId} from './utils'

export default {
	props: {
		annotations: {},
		options: {},
		input: {default: 'input-text'}
	},
	data: function() {
		return {
			newAnnotation: null,
			newAnnotationDrawing: false,
			lock: false
		}
	},
	methods: {
		beginDraw: function(e) {
			if (this.lock) return;
			this.newAnnotationDrawing = true;
			this.newAnnotation = { 
				x: e.clientX, y: e.clientY, width:1, height:1, 
				status:'new',
				label: '',
				id: randomId()
			};
		},
		drawing: function(e) {
			if (!this.newAnnotationDrawing) return;
			this.newAnnotation.width = e.clientX - this.newAnnotation.x;
			this.newAnnotation.height = e.clientY - this.newAnnotation.y;
		},
		drawn: function(e) {
			if (this.lock) return;
			if(this.newAnnotation.width<3 || this.newAnnotation.height<3) {
				this.newAnnotationDrawing = false;
				return;
			}
			this.annotations.push(this.newAnnotation);
			this.newAnnotationDrawing = false;
			this.newAnnotation = null;
			this.lock = true;
		}
	},
	events: {
		labeled: function(msg) {
			this.lock = false;
			if (!msg) return;
			for (var i = 0; i < this.annotations.length; i++) {
				if (this.annotations[i].id == msg.id) {
					this.annotations[i].label = msg.label;
					this.annotations[i].status = 'labeled';
				}
			}
		},
		remove: function(msg) {
			this.annotations = this.annotations.filter(function(annotation){
				return annotation.id != msg.id;
			});
			this.lock = false;
		},
		toEdit: function(msg) {
			for (var i = 0; i < this.annotations.length; i++) {
				if (this.annotations[i].id == msg.id) {
					this.annotations[i].status = 'edit';
				}
			}
		},
	},
	components: { Annotation, Outline }
};
</script>

<style>
.annotatable {
	cursor: crosshair;
}
</style>
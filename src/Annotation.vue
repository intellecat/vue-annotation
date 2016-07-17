<template>
	<div class="annotation" v-bind:style="size">
		<span class="text-label">{{ label }}</span>
		<component v-bind:style="inputPosition" v-show="editing" :is="input" :options="options"></component>
		<a class="btn-close" href="#" @click="close" @mousedown.stop @mouseup.stop>&times;</a>
		<a v-if="showEditButton" class="btn-edit" href="#" @click="toEdit" @mousedown.stop @mouseup.stop>edit</a>
	</div>
</template>
<script>
import {sizeToStyle, inputMixin} from './utils'
import MenuSelect from './MenuSelect.vue'

export default {
	props: ['props', 'input', 'options'],
	computed: {
		size: function(){
			return sizeToStyle(this.props);
		},
		editing: function() {
			return this.props.status == 'edit' || this.props.status == 'new';
		},
		showEditButton: function() {
			return !this.editing;
		},
		label: function() {
			return this.props.label;
		},
		status: function() {
			return this.props.status;
		},
		id: function() {
			return this.props.id;
		},
		inputPosition: function() {
			return {
				top: this.props.height+3 + 'px'
			}
		}
	},
	methods: {
		labeled: function(e) {
			this.$dispatch('labeled', {id: this.id, label: e.target.value});
		},
		close: function(e) {
			this.$dispatch('remove', {id: this.id});
		},
		toEdit: function(e) {
			this.$dispatch('toEdit', {id: this.id});
		}
	},
	events: {
		edit: function(msg) {
			this.$dispatch('labeled', {id: this.id, label: msg.label});
		}
	},
	components: {
		InputText: {
			template: `<div class="annotation-input" @mousedown.stop @mouseup.stop>
			<input type="text" name="annotation_text" autofocus @keyup.enter="edit" v-model="label">
		</div>`,
			mixins: [inputMixin]
		},
		InputNone: {
			template: '',
			created: function() {
				this.$dispatch('labeled');
			}
		},
		InputSelect: {
			template: `<div class="annotation-input" @mousedown.stop @mouseup.stop>
			<select name="select" @change="edit" v-model="label">
				<option value="">--</option>
				<option v-for="option in options" value={{option}}>{{option}}</option>
			</select>
		</div>`,
			props: ['options'],
			mixins: [inputMixin]
		},
		InputMenu: MenuSelect
	}

}
</script>

<style>
.annotation {
	outline: 1px solid rgba(0,0,0,0.5);
	border: 1px solid rgba(255,255,255,0.5);
	position: absolute;
}
.annotation:hover .btn-close {
	display: block;
}
.annotation .btn-close {
	position: absolute;
	font-size: 14px;
	line-height: 16px;
	width: 16px;
	height: 16px;
	text-align: center;
	border-radius: 10px;
	color: white;
	right: -10px;
	top: -10px;
	border: 2px solid white;
	text-decoration: none;
	background-color: black;
	display: none;
}
.annotation .text-label {
	padding: 3px;
	color: #fff;
	font-size: 12px;
	display: inline-block;
    background-color: rgba(0,0,0,0.5);
}
.annotation-input {
	position: absolute;
	bottom: -24px;
	left: 0;
}
</style>
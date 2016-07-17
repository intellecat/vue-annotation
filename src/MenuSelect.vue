<template>
	<div class="menu-select" @mousedown.stop @mouseup.stop>
		<div class="input" @click="toggle">{{selected ? selected : '请选择'}}</div>
		<ul class="dropdown" v-show="open">
			<li class="group" v-for="(group, items) in options">
				<span>{{group}}</span>
				<ul class="items">
					<li class="item" v-for="item in items">
						<label>
							{{item}}
							<input type="radio" v-model="selected" @change="change" value="{{item}}">
						</label>
					</li>
				</ul>
			</li>
			
		</ul>
	</div>	
</template>

<script>
export default {
	props: ['options'],
	data () {
		return {
			selected: '',
			open: false

		}
	},
	methods: {
		toggle() {
			this.open = !this.open;
		},
		change() {
			this.toggle();
			this.$dispatch('edit', {label: this.selected});
		}
	}
}
</script>

<style scoped>
	.menu-select {
		width: 100%;
		display: block;
		font-size: 14px;
		z-index: 100;
		position: absolute;
		left: 0;
	}
	.input {
		border: 1px #999 solid;
		border-radius: 3px;
		padding: 5px 10px;
		margin-bottom: 2px;
		cursor: pointer;
		background-color: white;
	}
	.input:after {
		content: '▾';
		float: right;
	}
	.items {
		display: none;
		position: absolute;
		top: 0;
		left: 100%;
		padding-left: 0;
		border: 1px #bbb solid;
		border-radius: 0 3px 3px 3px;
		width: 100%;
		background-color: white;
	}
	.dropdown {
		list-style: none;
		padding-left: 0;
		margin: 0;
		border: 1px #bbb solid;
		border-radius: 3px;
		width: 100%;
		background-color: white;
	}
	.group {
		position: relative;
		padding: 5px 10px;
	}
	.group:after {
		content: '▸';
		float: right;
	}
	.group:hover {
		background-color: #EEE;
	}
	.group:hover .items {
		display: block;
	}
	.item {
		display: block;
		padding: 5px;
		white-space: nowrap;
	}
	.item label {
		display: block;
		cursor: pointer;
	}
</style>
import Vue from 'vue'
import Annotatable from './Annotatable.vue'
import Output from './Output.vue'
import {randomId} from './utils'

new Vue({
	el: '#app',
	data: annotationData,
	components: { Annotatable, Output }
});
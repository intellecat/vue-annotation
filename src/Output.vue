<template>
	<textarea class="text-output">{{summarized|json}}</textarea>
</template>
<script>
export default {
	props: ['annotations'],
	computed: {
		summarized() {
			return this.annotations
				.filter(annotation => annotation.status != 'new')
				.map(annotation => {
					let {x,y,width,height,label} = annotation
					return {x,y,width,height,label}
				});
		}
	}
}
</script>
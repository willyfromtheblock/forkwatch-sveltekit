<script lang="ts">
	import { onMount } from 'svelte';
	export let progress = 0;
	onMount(async () => {
		await import('js-circle-progress');
	});
</script>

<circle-progress value={progress} max="100" text-format="value" />

<style>
	::part(base) {
		height: 200px;
		width: auto;
	}
	::part(value) {
		stroke-width: 6px;
		stroke: black;
		stroke-linecap: round;
	}
	::part(text) {
		fill: white;
		font-family: 'Roboto', sans-serif;
		font-size: 1.5em;
	}
	::part(circle) {
		stroke-width: 2px;
	}
</style>

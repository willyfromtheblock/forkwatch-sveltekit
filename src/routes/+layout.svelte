<script lang="ts">
	import '$lib/css/index.scss';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}

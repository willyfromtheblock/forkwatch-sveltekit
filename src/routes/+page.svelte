<script lang="ts">
	import Progress from '$lib/components/Progress.svelte';
	import Chart from '$lib/components/Chart.svelte';

	export let data;
	const { forkActivated, progress, chartData, lastUpdate } = data;

	let activationTimeReached = Date.now() >= 1741780800 * 1000;
	const isOver75Percent = progress >= 75;
</script>

<div class="ppc-hero">
	<div class="m-y-2">
		<div class="flex-center ppc-logo-container">
			<img
				class="ppc-logo"
				src="img/peercoin-horizontal-greenleaf-blacktext-transparent.svg"
				alt="peercoin logo"
			/>
		</div>
		<h1>0.15 Fork Watcher</h1>
	</div>
	<div class="ppc-background">
		<div class="flex-center m-y-2 progress-circle">
			<Progress {progress} />
		</div>
		<div>
			<table class="ppc-table">
				<tr>
					<td>
						<img src={isOver75Percent ? 'img/check.png' : 'img/cross.png'} alt="status" />
					</td>
					<td> 75% majority block version 5 over the last 1000 blocks reached </td>
				</tr>
				<tr>
					<td>
						<img src={activationTimeReached ? 'img/check.png' : 'img/cross.png'} alt="status" />
					</td>
					<td>March 12th, 2025 - 12:00 UTC reached</td>
				</tr>
			</table>
			<div class="flex-center ppc-fork-active m-y-2">
				{#if forkActivated > 0}
					<h2>
						Fork activated since {new Date(forkActivated).toUTCString()}
					</h2>
				{:else}
					<h2>Fork not activated</h2>
				{/if}
			</div>
		</div>
		<div class="m-y-2 flex-center">
			<Chart {chartData} />
		</div>
	</div>
	<footer class="ppc-footer m-y-1">
		<div>
			<a href="https://ppc.lol/v5-announcement" rel="noopener norefferer" target="_blank">
				What is this about?
			</a>
		</div>
		<div class="ppc-donation">Donations: PM7jjBUPjzpkZy1UZtD7mvmHoXJ2BGvbx9</div>
		<div>Last update: {lastUpdate}</div>
	</footer>
</div>

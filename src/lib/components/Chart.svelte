<script lang="ts">
	import type { ChartData } from '$lib/types/ChartData';
	import * as Highcharts from 'highcharts';
	import Exporting from 'highcharts/modules/exporting';
	import { onMount } from 'svelte';

	export let chartData: ChartData[] = [];

	const options: Highcharts.Options = {
		chart: {
			renderTo: 'chart-container'
		},
		colors: ['#3cb054', '#b35900', 'dodgerblue'],
		title: {
			text: 'v6 Blocks Progress'
		},
		legend: {
			enabled: false
		},
		xAxis: {
			allowDecimals: false,
			title: {
				text: 'Blocks',
				style: {
					'font-size': '0.8rem'
				}
			}
		},
		plotOptions: {
			series: {
				turboThreshold: 5000,
				dataGrouping: {
					enabled: true,
					forced: true
				}
			}
		},
		yAxis: {
			title: {
				text: 'Progress',
				style: {
					'font-size': '0.8rem'
				}
			},
			min: 0.1,
			minorTickInterval: 'auto'
		},
		series: [
			{
				type: 'line',
				name: 'Progress',
				data: chartData
			}
		]
	};

	onMount(async () => {
		// Initialize exporting module.
		Exporting(Highcharts);

		// Generate the chart
		Highcharts.chart(options);
	});
</script>

<div id="chart-container" class="chart-container" />

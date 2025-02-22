import type { ChartData } from '$lib/types/ChartData.js';

export async function load({ fetch }) {
	// Fetch the current progress from the backend
	const currentResponse = await fetch('https://fork.peercoinexplorer.net/v6_current.dat');
	const currentText = await currentResponse.text();
	const progress = parseFloat(currentText.split(',')[1]);
	// Fetch the fork activation timestamp from the backend
	let forkActivated = 0;
	const reachedThresholdResponse = await fetch(
		'https://fork.peercoinexplorer.net/v6_fork_activated.dat'
	);
	const forkActivatedResult = await reachedThresholdResponse.json();
	if (forkActivatedResult > 0) {
		forkActivated = forkActivatedResult * 1000;
	}

	// Fetch the chart data from the backend
	// Initialize the chartData array with the specific type
	const chartData: ChartData[] = [];
	const historyResponse = await fetch('https://fork.peercoinexplorer.net/v6_history_grouped.dat');
	const text = await historyResponse.text();
	const splitText = text.split('\n');

	splitText.forEach((x) => {
		if (x.length > 0) {
			chartData.push(JSON.parse(x));
		}
	});

	return {
		forkActivated,
		progress,
		chartData,
		lastUpdate: currentResponse.headers.get('last-modified')
	};
}

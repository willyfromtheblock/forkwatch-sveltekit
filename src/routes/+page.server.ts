import type { ChartData } from '$lib/types/ChartData.js';

export async function load({ fetch }) {
	// Fetch all data concurrently
	const [currentResponse, reachedThresholdResponse, historyResponse] = await Promise.all([
		fetch('https://fork.peercoinexplorer.net/v6_current.dat'),
		fetch('https://fork.peercoinexplorer.net/v6_fork_activated.dat'),
		fetch('https://fork.peercoinexplorer.net/v6_history_grouped.dat')
	]);

	// Process current progress
	const currentText = await currentResponse.text();
	const progress = parseFloat(currentText.split(',')[1]);

	// Process fork activation timestamp
	let forkActivated = 0;
	const forkActivatedResult = await reachedThresholdResponse.json();
	if (forkActivatedResult > 0) {
		forkActivated = forkActivatedResult * 1000;
	}

	// Process chart data
	const chartData: ChartData[] = [];
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

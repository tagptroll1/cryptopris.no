<script context="module" lang="ts">
</script>

<script lang="ts">
import CurrentBtcPrice from '$lib/CurrentBtcPrice.svelte';
// import { onMount } from 'svelte';

// onMount(() => {
// 	const websocket = new WebSocket(`wss://stream.crypto.com/v2/market`);

// 	// websocket.onopen = event => {
// 	// 	websocket.send(JSON.stringify({
// 	// 		"event": "subscribe",
// 	// 		"channel": "ticker",
// 	// 		"symbol": "BTCUSDT"
// 	// 	}))
// 	// };
// 	websocket.onerror = event => {
// 		console.error(event);
// 	};

// 	websocket.onclose = event => {
// 		console.log(event);
// 	};

// 	websocket.onopen = event => {
// 		console.log(event)
// 		websocket.send(JSON.stringify({
// 			"id": 11,
// 			"method": "subscribe",
// 			"params": {
// 				"channels": ["ticker.BTC_USDT"]
// 			},
// 			"nonce": 1587523073344
// 		}))
// 	};
// 	websocket.onmessage = (event) => {
// 		const data = JSON.parse(event.data);

// 		if (data.method === 'public/heartbeat') {
// 			websocket.send(JSON.stringify({
// 				"id": event.data.id,
// 				"method": "public/respond-heartbeat"
// 			}))
// 		} 
// 		else if (data.method === 'subscribe') {
// 			if (data.result.channel === 'ticker') {

// 			}
// 		}
// 		console.log(data)
// 	}
// });


// const baseUrl = import.meta.env.VITE_GO_CRYPTO_URL;
// let promise = fetch(`${baseUrl}/crypto?currency=NOK&spot=BTC`)
// 		.then(res => res.json())

</script>

<svelte:head>
	<title>BitCoin pris</title>
</svelte:head>

<section>

<CurrentBtcPrice />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}
</style>
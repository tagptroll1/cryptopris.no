<script lang="ts">
    import { onMount } from "svelte";
    import Counter from "./Counter.svelte";
import { Throttle } from "./Throttle";
    export let price = 0.0;
    export let coin = "BTC";
    export let currency = 'USD';

    let lastprice = 0;
    let diff = 0;

    // onMount(() => {
    //     const baseUrl = import.meta.env.VITE_GO_CRYPTO_URL;
    //     const sse = new EventSource(`${baseUrl}/events/btcprice`);
    //     sse.onmessage = (event) => {
    //         const {data} = JSON.parse(event.data);

    //         // parse string to 3 decimal places float number
    //         price = Number(parseFloat(data.amount).toFixed(3));
    //         coin = data.base;
    //         diff = data.diff;
    //         currency = data.currency;
    //     }

    //     return () => {
    //         if(sse.readyState === 1) {
    //             sse.close();
    //         }
    //     }
    // });

    onMount(() => {
	const websocket = new WebSocket(`wss://stream.crypto.com/v2/market`);
    const throttle = new Throttle((data) => {
        price = data
                
        if (lastprice !== 0) {
            diff = 1 - (price / lastprice);
        }
        lastprice = price;
    }, 500);

	websocket.onerror = event => {
		console.error(event);
	};

	websocket.onclose = event => {
		console.log(event);
	};

	websocket.onopen = event => {
		websocket.send(JSON.stringify({
			"id": 11,
			"method": "subscribe",
			"params": {
				"channels": ["ticker.BTC_USDT"]
			},
			"nonce": 1587523073344
		}))
	};
	websocket.onmessage = (event) => {
		const data = JSON.parse(event.data);

		if (data.method === 'public/heartbeat') {
			websocket.send(JSON.stringify({
				"id": event.data.id,
				"method": "public/respond-heartbeat"
			}))
		} 
		else if (data.method === 'subscribe') {
			if (data.result?.channel === 'ticker') {
				throttle.exec(data.result.data[0].a)
                // price = data.result.data[0].a
                
                // if (lastprice !== 0) {
                //     diff = 1 - (price / lastprice);
                // }
                // lastprice = price;
			}
		}
	}
});
</script>

{#if price && coin}
    <h1>Current {coin} price in {currency}</h1>
    <Counter nextNumber={price} {diff}/>
{/if}

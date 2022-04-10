<script lang="ts">
    import { onMount } from "svelte";
    import Counter from "./Counter.svelte";
    export let price = 0.0;
    export let coin = "";
    export let currency = '';

    let diff = 0;

    onMount(() => {
        const baseUrl = import.meta.env.VITE_GO_CRYPTO_URL;
        const sse = new EventSource(`${baseUrl}/events/btcprice`);
        sse.onmessage = (event) => {
            const {data} = JSON.parse(event.data);

            // parse string to 3 decimal places float number
            price = Number(parseFloat(data.amount).toFixed(3));
            coin = data.base;
            diff = data.diff;
            currency = data.currency;
        }

        return () => {
            if(sse.readyState === 1) {
                sse.close();
            }
        }
    });
</script>

{#if price && coin}
    <h1>Current {coin} price in {currency}</h1>
    <Counter nextNumber={price} {diff}/>
{/if}

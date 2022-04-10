<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
import CurrentBtcPrice from '$lib/CurrentBtcPrice.svelte';
const baseUrl = import.meta.env.VITE_GO_CRYPTO_URL;
let promise = fetch(`${baseUrl}/crypto?currency=NOK&spot=BTC`)
		.then(res => res.json())

</script>

<svelte:head>
	<title>BitCoin pris</title>
</svelte:head>

<section>

	{#await promise then {data}}
	<CurrentBtcPrice coin={data.base} price={Number(data.amount)} currency={data.currency} />
	{/await}
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
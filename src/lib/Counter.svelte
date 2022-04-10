<script lang="ts">
	import { fly } from 'svelte/transition';
	import ArrowDown from './icons/ArrowDown.svelte';
	import ArrowUp from './icons/ArrowUp.svelte';
	
		export let nextNumber = 0.0;
		export let diff = 0;
	
		$: modulus = diff > 0 ? 1 : diff < 0 ? -1 : 0;
		$: increment = diff < 0;
		$: decrement = diff > 0;
		$: percent = diff.toFixed(3)
		
	</script>
	
	<div class="counter">
		<div class="counter-viewport">
			{#key nextNumber}
				<div class="counter-digits" in:fly="{{ y: -100 * modulus, duration: 150 }}" out:fly="{{ y: 100 * modulus, duration: 150 }}">
					<strong class={increment ? 'increment' : decrement ? 'decrement' : ''}>
						<div class={percent.endsWith("0.000") ? 'arrow' : 'arrow-percent'}>
							{#if decrement}
							<ArrowDown  />
							{:else if increment}
							<ArrowUp />
							{/if}
							{#if !percent.endsWith("0.000")}
								<span class="percent">
									{percent}%
								</span>
							{/if}
						</div>
						${nextNumber}
					</strong>
	
				</div>
			{/key}
		</div>
	</div>
	
	<style>
	
		.counter {
			display: flex;
			border-top: 1px solid rgba(0, 0, 0, 0.1);
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			margin: .5rem 0;
			font-family: var(--font-mono);
		}
	
		.arrow {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			position: absolute;
			left: -2em;
			top: 25px;

			font-size: 12px

		}

		.arrow-percent {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			position: absolute;
			left: -5em;
			top: 24px;

			font-size: 12px
		}

		.counter-viewport {
			width: 24em;
			height: 4em;
			overflow: hidden;
			text-align: center;
			position: relative;
		}
	
		.increment {
			color: green;
		}
	
		.decrement {
			color: red
		}
	
		.counter-viewport strong {
			position: absolute;
			display: flex;
			height: 100%;
			font-weight: 400;
			font-size: 2rem;
			align-items: center;
			justify-content: center;
		}
	
		.counter-digits {
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
		}
	</style>
	
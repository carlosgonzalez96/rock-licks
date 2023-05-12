<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import ProductCard from "$lib/productCard.svelte";
	import { get} from "svelte/store"
    import { cartItems, addToCart, removeFromCart } from "../cart";

	const products : Product[] = [
		{
			id: "price_1N6eNfDvbmeAY9rt9tCs4t7i",
			item_picture: "https://www.yummymummyclub.ca/sites/default/files/Rock_Candy_Finished2.jpg",
			name: "Rock Candy",
			price: 5
		},
		{
			id: "price_1N6eSpDvbmeAY9rtwhS32pUR",
			item_picture: "https://www.for-sale.co.uk/sh-img/1-Chocolate-lollipops-web_chocolate%2Blollipops.jpg",
			name: "Chocolate Rock",
			price: 4
		},
		{
			id: "price_1N6eTuDvbmeAY9rtwLuYG0GT",
			item_picture: "https://i.etsystatic.com/25464527/r/il/c74c53/3127139229/il_fullxfull.3127139229_buvx.jpg",
			name: "Lemon Rock",
			price: 5
		}
	]

	async function checkout() {
		await fetch("api/stripeCheckOut", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(
				{items: get(cartItems)}
			)
		}).then((data) => {
			return data.json()
		}).then((data) => {
			data.url
			window.location.replace(data.url);
		});
	}
</script>
<div class="switch_mode p-10 float-right">
	<LightSwitch />
</div>

<div class="container h-full mx-auto flex justify-center items-center">
	
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>Rock Licks</h1>
		</div>
		{#each products as product}
			<ProductCard product={product}/>
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkout()}>Checkout with Stripe</button>
		</div>
	</div>
</div>

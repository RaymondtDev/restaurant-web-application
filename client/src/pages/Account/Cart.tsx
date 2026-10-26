function Cart() {
  return (
    <div className="w-full px-2 md:px-12 lg:px-24 flex flex-col md:flex-row">
      {/* cart items */}
      <div className="flex-1">
        <p>Placeholder</p>
        <p>Placeholder</p>
        <p>Placeholder</p>
        <p>Placeholder</p>
      </div>

      {/* cart summary */}
      <aside className="md:w-104 p-2 bg-gray-200/50 rounded-md">
        <p>Placeholder</p>
        <p>Placeholder</p>
        <p>Placeholder</p>
        <p>Placeholder</p>
        <button className="bg-charcoal-800 w-full text-white font-bold border-none rounded-sm py-2 cursor-pointer transition hover:scale-102">Chekout</button>
      </aside>
    </div>
  );
}

export default Cart;
import { AddItemForm, ItemsList } from "../components"
import { DividentsList } from "../components"

const Home = () => {
  return (
    <section className="container pt-4">
      <article className="p-4 bg-neutral-100 rounded shadow mb-2">
        {/* DIVIDENTI */}
        <h2 className="font-bold text-lg mb-2 pb-1 border-b border-dim-50">Dělitelé</h2>
        <DividentsList />
      </article>
      <article className="p-4 bg-neutral-100 rounded shadow">
        <h2 className="font-bold text-lg mb-1 pb-1 border-b border-dim-50">Přidat položku</h2>
        <AddItemForm />
        <div className="my-6" />
        <h3 className="font-bold text-lg mb-2 pb-1 border-b border-dim-50">Položky nákupu</h3>
        <ItemsList />
      </article>
    </section>
  )
}

export default Home

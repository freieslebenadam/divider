import { FaTimes } from "react-icons/fa"
import { AddItemForm, ItemsList } from "../components"
import { DividentsList } from "../components"
import { useItems } from "../hooks"

const Home = () => {
  const {purgeAllItems} = useItems()

  return (
    <section className="container pt-4">
      <article className="p-4 bg-neutral-100 dark:bg-neutral-800 transition-bg-100 rounded shadow mb-2">
        {/* DIVIDENTI */}
        <h2 className="font-bold text-lg mb-2 pb-1 border-b border-dim-50 dark:border-lighter-50">Dělitelé</h2>
        <DividentsList />
      </article>
      <article className="p-4 bg-neutral-100 dark:bg-neutral-800 transition-bg-100 rounded shadow">
        <h2 className="font-bold text-lg mb-1 pb-1 border-b border-dim-50 dark:border-lighter-50">Přidat položku</h2>
        <AddItemForm />
        <div className="my-6" />
        <div className="flex items-center mb-2 pb-1 gap-2 border-b border-dim-50 dark:border-lighter-50">
          <h3 className="font-bold text-lg">Položky nákupu</h3>
          <div className="text-neutral-500 text-[.65rem] p-[.35rem] rounded-full bg-neutral-200 transition-100 hover:text-white hover:bg-red-500 cursor-pointer dark:bg-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-red-500" onClick={purgeAllItems}>
            <FaTimes />
          </div>
        </div>
        <ItemsList />
      </article>
    </section>
  )
}

export default Home

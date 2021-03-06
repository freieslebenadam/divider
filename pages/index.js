import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { FaTimes } from "react-icons/fa"
import { AddItemForm, ItemsList } from "../components"
import { DividentsList } from "../components"
import { useCurrency, useItems, useLocale, useLocalStorage } from "../hooks"
import { useEffect } from "react"

const Home = () => {
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
  const {purgeAllItems} = useItems()

  const [localStorageCurrency, setLocalStorageCurrency] = useLocalStorage("currency", null)

  const { locale } = useRouter()
  const {t, setLocaleTo} = useLocale()
  const {currencies, setCurrencyTo} = useCurrency()

  const openConfirmDelete = () => {
    setConfirmDeleteModal(true)
  }

  const closeConfirmDelete = () => {
    setConfirmDeleteModal(false)
  }
  
  const confirmDelete = () => {
    purgeAllItems()
    closeConfirmDelete()
  }

  useEffect(() => {
    setLocaleTo(locale)

    if (localStorageCurrency === null) {
      switch (locale) {
        case "en":
          setCurrencyTo(currencies.find(cur => cur.name === "EUR").id)
          break
        case "cs":
          setCurrencyTo(currencies.find(cur => cur.name === "CZK").id)
          break
      }
    } else {
      setCurrencyTo(localStorageCurrency)
    }
  }, [])

  return (
    <section className="container pt-4 lg:flex lg: lg:flex-row-reverse lg:justify-between lg:gap-4">
      <Head>
        <title>Divider</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div style={{display: confirmDeleteModal? "flex": "none"}} className="fixed items-center justify-center top-0 left-0 bottom-0 right-0 animate-fade z-10">
        <div className="absolute z-40 top-0 left-0 w-full h-full bg-dim-500" onClick={closeConfirmDelete} />
        <div className="flex flex-col p-6 bg-neutral-100 dark:bg-neutral-700 transition-bg-100 rounded shadow-md z-50 w-[80%] sm:w-96">
          <div>
            <h4 className="font-bold text-lg">{t.items.delete_modal.title}</h4>
          </div>
          <div className="my-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.items.delete_modal.body}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2 transition-100 hover:bg-red-400 text-sm font-semibold text-white bg-red-500 rounded shadow" type="button" onClick={closeConfirmDelete}>{t.items.delete_modal.button_cancel}</button>
            <button className="flex-1 py-2 transition-100 hover:bg-green-400 text-sm font-semibold text-white bg-green-500 rounded shadow" type="submit" onClick={confirmDelete}>{t.items.delete_modal.button_confirm}</button>
          </div>
        </div>
      </div>

      <article className="p-4 bg-neutral-100 dark:bg-neutral-800 transition-bg-100 rounded shadow mb-2 lg:w-[22rem] lg:h-max">
        {/* DIVIDENTS */}
        <h2 className="font-bold text-lg mb-2 pb-1 border-b border-dim-50 dark:border-lighter-50">{t.dividents.title}</h2>
        <DividentsList />
      </article>
      <article className="p-4 bg-neutral-100 dark:bg-neutral-800 transition-bg-100 rounded shadow lg:flex-auto">
        <h2 className="font-bold text-lg mb-1 pb-1 border-b border-dim-50 dark:border-lighter-50">{t.items.add_form.title}</h2>
        <AddItemForm />
        <div className="my-6" />
        <div className="flex items-center mb-2 pb-1 gap-2 border-b border-dim-50 dark:border-lighter-50">
          <h3 className="font-bold text-lg">{t.items.list.title}</h3>
          <div className="text-neutral-500 text-[.65rem] p-[.35rem] rounded-full bg-neutral-200 transition-100 hover:text-white hover:bg-red-500 cursor-pointer dark:bg-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-red-500" onClick={openConfirmDelete}>
            <FaTimes />
          </div>
        </div>
        <ItemsList />
      </article>
    </section>
  )
}

export default Home

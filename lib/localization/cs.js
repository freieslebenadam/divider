const cs = {
  currency: "Kč",
  dividents: {
    title: "Dělitelé",
    modal: {
      title: "Přidat dělitele",
      name_label: "Jméno",
      name_placeholder: "Jan",
      color_label: "Barva",
      button_cancel: "Zrušit",
      button_confirm: "Přidat"
    }
  },
  items: {
    add_form: {
      title: "Přidat položku",
      name_label: "Název",
      name_placeholder: "Položka",
      price_label: "Cena",
      price_placeholder: "19.90",
      button_add: "Přidat",
    },
    delete_modal: {
      title: "Smazat všechny položky?",
      body: "Jste si jistí, že chcete odstranit všechny položky ze seznamu?",
      button_cancel: "Ne",
      button_confirm: "Ano"
    },
    list: {
      title: "Položky nákupu",
      items_count: {
        one: "Položka",
        rest: "Položek",
        special: "Položky"
      },
      items_price_sum: "Celkem",
      sorting: {
        newest: "Od nejnovějších",
        oldest: "Od nejstarších",
        name: "Dle názvu",
        most_expensive: "Od nejdražších",
        cheapest: "Od nejlevnějších",
        dividents: "Dle dlužitelů"
      },
      filtering: {
        title: "Filtrovat",
        non_asigned: "Nepřiřazeno"
      },
      item: {
        button_delete: "Odstranit",
        add_dividents_modal: {
          title: "Položka",
          subtitle: "Tato položka stojí",
          dividents_label: "Přidělit dělitele",
          no_dividents: "Žádní dělitelé",
          button_ok: "Ok"
        }
      }
    }
  },
  receipt: {
    title: "Kompletní vyúčtování",
    total: "Celkem",
    no_totals: "Nikdo nic nedluží",
    button_ok: "Ok"
  }
}

export default cs
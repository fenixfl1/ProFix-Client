import { MenuOption } from "@/interfaces/user"
import { create } from "zustand"

interface MenuOptionState<T = any> {
  menuOptions: MenuOption<T>[]
  selectedMenuOption: MenuOption<T>
  selectedItem: string[]
  setMenuOptions: (menuOptions: MenuOption<T>[]) => void
  setSelectedMenuOption: (selectedMenuOption: MenuOption<T>) => void
  setSelectedKey: (keys: string[]) => void
}

const menuOptionStore = create<MenuOptionState>((set) => ({
  menuOptions: [],
  selectedMenuOption: <MenuOption>{},
  selectedItem: [],
  setSelectedKey: (selectedItem) => set({ selectedItem }),
  setMenuOptions: (menuOptions) => set({ menuOptions }),
  setSelectedMenuOption: (selectedMenuOption) => {
    sessionStorage.setItem(
      "selectedMenuOption",
      JSON.stringify(selectedMenuOption)
    )
    set({ selectedMenuOption })
  },
}))

function useMenuOptionStore<T = unknown>() {
  return menuOptionStore() as MenuOptionState<T>
}

export default useMenuOptionStore

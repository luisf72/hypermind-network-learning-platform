import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Lang = 'EN' | 'ES'

interface LangState {
  lang: Lang
  set: (l: Lang) => void
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: 'EN',
      set: (l) => set({ lang: l }),
    }),
    { name: 'hm-lang' }
  )
)

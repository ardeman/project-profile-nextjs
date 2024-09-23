import { Dispatch, SetStateAction } from 'react'

export type TProps = {
  setActiveSection: Dispatch<SetStateAction<string>>
  activeSection: string
}

export type TSocial = {
  name: string
  url: string
  icon: JSX.Element
}

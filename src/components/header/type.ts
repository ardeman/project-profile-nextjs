import { Dispatch, SetStateAction } from 'react'

export type TProps = {
  setActiveSection: Dispatch<SetStateAction<string>>
  activeSection: string
}

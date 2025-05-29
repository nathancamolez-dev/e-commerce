'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'

interface UserModalContextProps {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const UserModalContext = createContext<UserModalContextProps | undefined>(
  undefined
)

export function UserModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <UserModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </UserModalContext.Provider>
  )
}

export function useUserModal() {
  const context = useContext(UserModalContext)
  if (!context) {
    throw new Error('useUserModal must be used within a UserModalProvider')
  }
  return context
}

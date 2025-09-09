'use client'

import { useGuideModal } from '@/hooks/use-guide-modal'
import GuideModal from '@/components/guide-modal'

interface GuideModalProviderProps {
  children: React.ReactNode
}

export default function GuideModalProvider({ children }: GuideModalProviderProps) {
  const { isModalOpen, closeModal } = useGuideModal()

  return (
    <>
      {children}
      <GuideModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

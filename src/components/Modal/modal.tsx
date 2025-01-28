import React, { useEffect, FC } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../ModalOverlay/modal-overlay'
import styles from './modal.module.scss'

interface ModalProps {
    title?: string
    onClose: () => void
    children: React.ReactNode
}

const modalRoot = document.getElementById('modals') as HTMLElement

export const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEsc)

        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [onClose])

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    {title && <h2 className="text text_type_main-large">{title}</h2>}
                    <button className={styles.closeButton} onClick={onClose} type="button">
                        <CloseIcon type="primary" />
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>,
        modalRoot
    )
}

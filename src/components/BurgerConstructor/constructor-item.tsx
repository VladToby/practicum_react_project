import { useRef, FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../types'
import styles from './constructor-item.module.scss'

interface ConstructorItemProps {
    item: IIngredient & { uuid: string }
    index: number
    handleDelete: (uuid: string) => void
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

export const ConstructorItem: FC<ConstructorItemProps> = ({ item, index, handleDelete, moveItem }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [{ isDragging }, drag] = useDrag({
        type: 'constructor-item',
        item: () => ({ id: item.uuid, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [, drop] = useDrop({
        accept: 'constructor-item',
        hover(item: { id: string; index: number }, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    drag(drop(ref))

    return (
        <div
            ref={ref}
            className={`${styles.item} ${isDragging ? styles.dragging : ''}`}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleDelete(item.uuid)}
            />
        </div>
    )
}

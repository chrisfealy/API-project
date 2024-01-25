import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteReview } from "../../store/reviews"

function DeleteReview({ review }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleClick = async e => {
        e.preventDefault()
        dispatch(deleteReview(review.id))
        closeModal()
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={handleClick}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReview

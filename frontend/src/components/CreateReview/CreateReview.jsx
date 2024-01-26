import { useState } from 'react'
import { createReview } from '../../store/reviews'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import './CreateReview.css'

function CreateReview({ spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [activeRating, setActiveRating] = useState(0)
    const [validationErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const handleRatingClick = (newRating) => {
        setRating(newRating)
        setActiveRating(newRating)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setSubmitted(true)
        const newReview = { review, stars: rating }
        dispatch(createReview(spotId, newReview))
        closeModal()
    }

    return (
        <div className="post-review-container">
            <h2>How was your stay?</h2>
            {submitted && validationErrors.errors && `${validationErrors.errors}`}
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <div className="rating-container" onMouseLeave={() => setActiveRating(rating)}>
                    <div onMouseEnter={() => setActiveRating(1)} onClick={() => handleRatingClick(1)}>
                        {activeRating >= 1 ? (<i className="fa-solid fa-star" />) : (<i className="fa-regular fa-star"></i>)}
                    </div>
                    <div onMouseEnter={() => setActiveRating(2)} onClick={() => handleRatingClick(2)}>
                        {activeRating >= 2 ? (<i className="fa-solid fa-star" />) : (<i className="fa-regular fa-star"></i>)}
                    </div>
                    <div onMouseEnter={() => setActiveRating(3)} onClick={() => handleRatingClick(3)}>
                        {activeRating >= 3 ? (<i className="fa-solid fa-star" />) : (<i className="fa-regular fa-star"></i>)}
                    </div>
                    <div onMouseEnter={() => setActiveRating(4)} onClick={() => handleRatingClick(4)}>
                        {activeRating >= 4 ? (<i className="fa-solid fa-star" />) : (<i className="fa-regular fa-star"></i>)}
                    </div>
                    <div onMouseEnter={() => setActiveRating(5)} onClick={() => handleRatingClick(5)}>
                        {activeRating >= 5 ? (<i className="fa-solid fa-star" />) : (<i className="fa-regular fa-star"></i>)}
                    </div>

                </div>
                <button type='submit'>Submit Your Review</button>
            </form>
        </div>
    )
}

export default CreateReview

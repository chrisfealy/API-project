import './CreateReview.css'

function CreateReview() {
    return (
        <div className="post-review-container">
            <h2>How was your stay?</h2>
            <textarea
                placeholder="Leave your review here..."
            >

            </textarea>
            <button>Submit Your Review</button>
        </div>
    )
}

export default CreateReview

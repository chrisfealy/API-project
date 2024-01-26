import { useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteReview from "../DeleteReview"

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function Reviews() {
    const sessionUser = useSelector(state => state.session.user)
    const spotReviews = useSelector(state => Object.values(state.reviews))
    const reviews = [...spotReviews].reverse()

    const getMonth = (review) => {
        const date = new Date(review.createdAt)
        return months[date.getMonth()]
    }

    const getYear = (review) => {
        const date = new Date(review.createdAt)
        return date.getFullYear()
    }

    return (
        <div>
            {reviews.map(review => (
                <div key={review.id}>
                    <h3>{review?.User?.firstName}</h3>
                    <p>{getMonth(review)} {getYear(review)}</p>
                    <p>{review?.review} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae autem recusandae veniam suscipit consequatur corrupti cumque reiciendis, saepe in error nam modi reprehenderit quia cum velit nesciunt quaerat laudantium laborum nulla assumenda dicta explicabo veritatis iusto. Quo, animi autem? Quaerat minus ratione neque atque recusandae cumque dicta consectetur fugit nobis.</p>
                    {(sessionUser?.id === review.userId) && (
                        <OpenModalButton
                            modalComponent={<DeleteReview review={review}/>}
                            buttonText='Delete'
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

export default Reviews

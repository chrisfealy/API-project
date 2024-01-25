import { useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteReview from "../DeleteReview"

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function Review({ review }) {
    // console.log('REVIEW', review.createdAt)
    const date = new Date(review.createdAt)
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const sessionUser = useSelector(state => state.session.user)
    return (
        <div>
            <h3>{review?.User.firstName}</h3>
            <h4>{month} {year}</h4>
            <p>{review?.review} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla mollitia atque vel dolore voluptas earum exercitationem ipsa veniam unde, hic asperiores rerum provident? Nam doloremque cupiditate odit nostrum ab magnam aliquam rem dolorum possimus facere temporibus praesentium, hic doloribus ea id nihil qui ipsam vel recusandae. Laudantium corporis officia est.</p>
            {(sessionUser?.id === review?.User.id) && (
                <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<DeleteReview review={review} />}
                />
            )}
        </div>
    )
}

export default Review

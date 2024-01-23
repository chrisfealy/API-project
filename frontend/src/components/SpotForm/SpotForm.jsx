import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addImages, createSpot } from "../../store/spots"
import { useDispatch } from "react-redux"
import './SpotForm.css'

function SpotForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [prevImg, setPrevImg] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const errors = {}
        if (!country.length) errors.country = 'Country is required'
        if (!address.length) errors.address = 'Address is required'
        if (!city.length) errors.city = 'City is required'
        if (!state.length) errors.state = 'State is required'
        if (!lat) errors.lat = 'Latitude is required'
        if (!lng) errors.lng = 'Longitude is required'
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if (!name.length) errors.name = 'Name is required'
        if (!price) errors.price = 'Price is required'
        if (!prevImg) errors.prevImg = 'Preview image is required'
        if (prevImg && !validImage(prevImg)) errors.prevImg = 'Image URL must end in .png, .jpg, or .jpeg'
        if (img1 && !validImage(img1)) errors.img1 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (img2 && !validImage(img2)) errors.img2 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (img3 && !validImage(img3)) errors.img3 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (img4 && !validImage(img4)) errors.img4 = 'Image URL must end in .png, .jpg, or .jpeg'
        setValidationErrors(errors)
    }, [country, address, city, state, lat, lng, description, name, price, prevImg, img1, img2, img3, img4])

    const validImage = img => {
        if (img.endsWith('.png')) return true
        if (img.endsWith('.jpg')) return true
        if (img.endsWith('.jpeg')) return true
        return false
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setSubmitted(true)
        const images = [prevImg, img1, img2, img3, img4].filter(img => img)
        if (!Object.keys(validationErrors).length) {
            return dispatch(createSpot({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            }))
                .then(spot => {
                    dispatch(addImages(spot.id, images))
                    return spot
                })
                .then(spot => {
                    console.log('SECOND THEN', spot)
                    navigate(`/spots/${spot.id}`)
                })
                .catch(async (err) => {
                    if(err.response) {
                        const data = await err.json()
                        if (data.errors) {
                            setValidationErrors({...data.errors, ...validationErrors})
                        }
                    }
                })
        }
    }

    return (
        <div>
            <h2>Create a new Spot</h2>
            <h3>Where&apos;s your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Country
                    <div className="errors">
                        {submitted && validationErrors.country && `${validationErrors.country}`}
                    </div>
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Street Address
                    <div className="errors">
                        {submitted && validationErrors.address && `${validationErrors.address}`}
                    </div>
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    City
                    <div className="errors">
                        {submitted && validationErrors.city && `${validationErrors.city}`}
                    </div>
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    State
                    <div className="errors">
                        {submitted && validationErrors.state && `${validationErrors.state}`}
                    </div>
                    <input
                        type="text"
                        placeholder="STATE"
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Latitude
                    <div className="errors">
                        {submitted && validationErrors.lat && `${validationErrors.lat}`}
                    </div>
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Longitude
                    <div className="errors">
                        {submitted && validationErrors.lng && `${validationErrors.lng}`}
                    </div>
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                    />
                </label>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <label>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="errors">
                        {submitted && validationErrors.description && `${validationErrors.description}`}
                    </div>
                </label>
                <h3>Create a title for your spot</h3>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <label>
                    <input
                        type="text"
                        placeholder="Name of your spot"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="errors">
                        {submitted && validationErrors.name && `${validationErrors.name}`}
                    </div>
                </label>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <label>
                    $
                    <input
                        type="text"
                        placeholder="Price per night (USD)"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <div className="errors">
                        {submitted && validationErrors.price && `${validationErrors.price}`}
                    </div>
                </label>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot</p>
                <label>
                    <input
                        type="text"
                        placeholder="Preview Image URL"
                        value={prevImg}
                        onChange={e => setPrevImg(e.target.value)}
                    />
                    <div className="errors">
                        {submitted && validationErrors.prevImg && `${validationErrors.prevImg}`}
                    </div>
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={img1}
                        onChange={e => setImg1(e.target.value)}
                    />
                    <div className="errors">
                        {submitted && validationErrors.img1 && `${validationErrors.img1}`}
                    </div>
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={img2}
                        onChange={e => setImg2(e.target.value)}
                    />
                    <div className="errors">
                        {submitted && validationErrors.img2 && `${validationErrors.img2}`}
                    </div>
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={img3}
                        onChange={e => setImg3(e.target.value)}
                    />
                    <div className="errors">
                        {submitted && validationErrors.img3 && `${validationErrors.img3}`}
                    </div>
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={img4}
                        onChange={e => setImg4(e.target.value)}
                    />
                    <div className="errors">
                        {submitted && validationErrors.img4 && `${validationErrors.img4}`}
                    </div>
                </label>
                <br />
                <button
                    type="submit"
                >
                    Create Spot
                </button>
            </form>
        </div>
    )
}

export default SpotForm

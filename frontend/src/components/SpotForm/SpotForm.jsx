import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createSpot } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import './SpotForm.css'

function SpotForm() {
    const sessionUser = useSelector(state => state.session.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState()
    const [prevImgURL, setPrevImgURL] = useState('')
    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        const errors = {}
        if(!country.length) errors.country = 'Country is required'
        if(!address.length) errors.address = 'Address is required'
        if(!city.length) errors.city = 'City is required'
        if(!state.length) errors.state = 'State is required'
        if(!lat) errors.lat = 'Latitude is required'
        if(!lng) errors.lng = 'Longitude is required'
        if(desc.length < 30) errors.desc = 'Description needs a minimum of 30 characters'
        if(!title.length) errors.title = 'Name is required'
        if(!price) errors.price = 'Price is required'
        if(!prevImgURL) errors.prevImgURL = 'Preview image is required'
        setValidationErrors(errors)
    }, [country, address, city, state, lat, lng, desc, title, price, prevImgURL])

    const onSubmit = async e => {
        e.preventDefault()
        setValidationErrors({})
        const newSpot = await dispatch(createSpot({
            ownerId: sessionUser.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name: title,
            description: desc,
            price
        }))
        console.log('NEW SPOT!!!', newSpot)
        if(newSpot.errors) setValidationErrors(newSpot.errors)
        else navigate(`/spots/${newSpot.id}`)
    }

    return (
        <div>
            <h2>Create a new Spot</h2>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>

            <form onSubmit={onSubmit}>
                <label>
                    Country
                    <div className="errors">
                        {validationErrors.country && `${validationErrors.country}`}
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
                        {validationErrors.address && `${validationErrors.address}`}
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
                        {validationErrors.city && `${validationErrors.city}`}
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
                        {validationErrors.state && `${validationErrors.state}`}
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
                        {validationErrors.lat && `${validationErrors.lat}`}
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
                        {validationErrors.lng && `${validationErrors.lng}`}
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
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                    <div className="errors">
                        {validationErrors.desc && `${validationErrors.desc}`}
                    </div>
                </label>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <label>
                    <input
                        type="text"
                        placeholder="Name of your spot"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <div className="errors">
                        {validationErrors.title && `${validationErrors.title}`}
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
                        {validationErrors.price && `${validationErrors.price}`}
                    </div>
                </label>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot</p>
                <label>
                    <input
                        type="text"
                        placeholder="Preview Image URL"
                        value={prevImgURL}
                        onChange={e => setPrevImgURL(e.target.value)}
                    />
                    <div className="errors">
                        {validationErrors.prevImgURL && `${validationErrors.prevImgURL}`}
                    </div>
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image URL"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Image URL"
                    />
                </label>
                <br />
                <button
                    type="submit"
                    disabled={Object.keys(validationErrors).length}
                >
                    Create Spot
                </button>
            </form>
        </div>
    )
}

export default SpotForm

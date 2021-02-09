import React,{ useState, useEffect } from 'react'

const Rate = ({ ratevalue, rateChange }) => {
    const[value, setValue] = useState(ratevalue)

    useEffect(()=>{
        rateChange(value)
    },[rateChange, value])

    return (
        <div className="rating">
            <span onClick={() => setValue(1)}>
                <i
                className={
                    value >= 1
                    ? "fas fa-star"
                    : value >= 0.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
                }
                ></i>
            </span>
            <span onClick={() => setValue(2)}>
                <i
                className={
                    value >= 2
                    ? "fas fa-star"
                    : value >= 1.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
                }
                ></i>
            </span>
            <span onClick={() => setValue(3)}>
                <i
                className={
                    value >= 3
                    ? "fas fa-star"
                    : value >= 2.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
                }
                ></i>
            </span>
            <span onClick={() => setValue(4)}>
                <i
                className={
                    value >= 4
                    ? "fas fa-star"
                    : value >= 3.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
                }
                ></i>
            </span>
            <span onClick={() => setValue(5)}>
                <i
                className={
                    value >= 5
                    ? "fas fa-star"
                    : value >= 4.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
                }
                ></i>
            </span>
        </div>
    )
}

export default Rate

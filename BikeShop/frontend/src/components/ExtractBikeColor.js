import React from 'react'

const ExtractBikeColor = ({bikeColors, removeColorHandler}) => {

    return (
    <>
        { bikeColors.length > 0 
            ? bikeColors.map((c,i) => (
                <div 
                    key={i}
                    className="bikecolors" 
                    style={{backgroundColor: c}}
                    onClick={e => removeColorHandler(c)}
                ></div>
            ))
            :'No Colors'
        }
    </>
    )
}

export default ExtractBikeColor

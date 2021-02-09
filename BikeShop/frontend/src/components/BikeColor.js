import React from 'react';
import { Col } from 'react-bootstrap'

const BikeColor = ({bikeColors}) => {
    return (
    <>
    <Col xs={4}><b>Colors:</b></Col>
    { bikeColors.length > 0 ? 
        bikeColors.map((c,i) => (
            <Col xs={1} key={i}>
                <div className="bikecolors" style={{backgroundColor: c}}> </div>
            </Col>
            
        ))
        :''
    }
    
    </>
    )
}

export default BikeColor

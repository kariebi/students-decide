import React from 'react'

const Loader = () => {
    return (
        <div className='w-screen h-screen z-50 flex items-center justify-center'>
            <div className="loader">
                <ul>
                    <li></li>
                </ul>
                <div className="ballotbox"><span></span></div>
            </div>
        </div>
    )
}

export default Loader
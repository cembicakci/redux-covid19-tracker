import React from 'react'

function Footer() {
    return (
        <footer>
            <h2>Created with care by <a href='https://www.github.com/cembicakci' target='_blank'>Cem Bıçakcı</a></h2>
            <ul>
                <li className='linkedin'>
                    <a href='https://www.linkedin.com/in/cembicakci/' target='_blank'><i className="fa-brands fa-linkedin"></i></a>
                </li>
                <li className='github'>
                    <a href='https://www.github.com/cembicakci' target='_blank'><i className="fa-brands fa-github"></i></a>
                </li>
                <li className='gmail'>
                    <a href="mailto:cmbicakci@gmail.com" target='_blank'><i className="fa-solid fa-envelope"></i></a>
                </li>
                <li className='twitter'>
                    <a href="https://twitter.com/cmbicakci" target='_blank'><i className="fa-brands fa-twitter"></i></a>
                </li>
            </ul>

        </footer>
    )
}

export default Footer
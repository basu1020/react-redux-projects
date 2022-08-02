import React from 'react'
import {Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <header>
                <div>
                    Redux Blog
                </div>
                <div>
                    <nav>
                        <ul>
                            <Link to="/"><li>Home</li></Link>
                            <Link to="/posts"><li>Blogs</li></Link>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar
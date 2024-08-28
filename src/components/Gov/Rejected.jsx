import React from 'react'
import { Link } from 'react-router-dom'
import { UsersData } from '../../data/Users'
// import '../../../src/App.css'

const Rejected = () => {
    return (
        <>
            <div className="gov-transfer">
                <div className="gov-trans-btns">
                    <button className='btn'> Rejected</button>
                    {/* <button className='btn'> Less Occured areas</button> */}
                </div>
                {/* <table>
                    <tr >
                        <th>City</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                        <th>More</th>
                    </tr>
                    <tr>
                        <td>TNK</td>
                        <td>BB1</td>
                        <td>BB2</td>
                        <td>process</td>
                        <td>Cancel</td>
                    </tr>
                    <tr>
                        <td>BVRM</td>
                        <td>BB3</td>
                        <td>BB4</td>
                        <td>Completed</td>
                        <td>Cancel</td>
                    </tr>

                    <tr>
                        <td>TNK</td>
                        <td>BB1</td>
                        <td>BB2</td>
                        <td>process</td>
                        <td>Cancel</td>
                    </tr>        </table> */}

                <div className="usr">
                    {UsersData.map(items => {
                        return (<div>
                            <div><img src={items.img} width={60} height={60} style={{ borderRadius: "50%" }} alt="" />
                                <p style={{ marginTop: "15px", marginLeft: "15px" }}>{items.name}</p></div>
                            <div className="group">{items.group}</div>
                            <div className="mobileNo">{items.mobileNo}</div>
                            <Link to={`/details/${items.id}`}><button className='btn'>Details</button></Link>
                        </div>)
                    })}
                </div>
                <div className="gov-trans-data"></div>
            </div>
        </>
    )
}

export default Rejected

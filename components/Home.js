/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RoomItem from "./room/roomItem";

const Home = () => {

    const { rooms, error } = useSelector(state => state.allRooms);


    useEffect(() => {
        toast.error(error)
    }, [])


    return (
        <section id="rooms" className="container mt-5">
            <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>

            <a href="#" className="ml-2 back-to-search">
                {" "}
                <i className="fa fa-arrow-left" /> Back to Search
            </a>
            <div className="row">

                {
                    rooms && rooms.length === 0 ?
                        <div className="alert alert-danger"><b>No Rooms Found</b></div>
                        :
                        rooms && rooms.map((room) => (
                            <RoomItem key={room.id} room={room} />
                        ))
                }
            </div>
        </section>
    );
};

export default Home;

/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import RoomItem from "./room/roomItem";
import { clearError } from "../redux/actions/roomActions";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } =
        useSelector((state) => state.allRooms);

    let { location, page = 1 } = router.query;
    page = Number(page);
    useEffect(() => {
        toast.error(error);
        dispatch(clearError());
    }, []);

    let queryParams;

    if (typeof window !== "undefined") {
        queryParams = new URLSearchParams(window.location.search);
    }

    const handlePagination = (pageNumber) => {
        if (queryParams.has("page")) {
            queryParams.set("page", pageNumber);
        } else {
            queryParams.append("page", pageNumber);
        }

        router.replace({
            search: queryParams.toString(),
        });
    };

    let count = roomsCount;
    if (location) {
        count = filteredRoomsCount;
    }

    return (
        <>
            <section id="rooms" className="container mt-5">
                <h2 className="mb-3 ml-2 stays-heading">
                    {location ? `Rooms in ${location}` : "All Rooms"}
                </h2>

                <Link href="/search" className="ml-2 back-to-search">
                    <i className="fa fa-arrow-left"> Back to Search</i>
                </Link>
                <div className="row">
                    {rooms && rooms.length === 0 ? (
                        <div className="alert alert-danger mt-5 w-100">
                            <b>No Rooms Found</b>
                        </div>
                    ) : (
                        rooms &&
                        rooms.map((room) => <RoomItem key={room._id} room={room} />)
                    )}
                </div>
            </section>
            {resPerPage < count && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={roomsCount}
                        onChange={handlePagination}
                        nextPageText={"Next"}
                        prevPageText={"Prev"}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            )}
        </>
    );
};

export default Home;

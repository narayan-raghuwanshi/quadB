import { Link } from "react-router-dom";
import { Show } from "../utils/interface";

interface EachShowBoxProps {
    show: Show;
}

const EachShowBox = ({ show }: EachShowBoxProps) => {
    return (
        <div>
            <div className="p-3 bg-gray-100 justify-between flex w-96 md:w-[450px] max-h-80 hover:shadow-lg hover:shadow-white transition box-border rounded-lg shadow-md">
                <div className="bg-white w-56 p-3 flex md:w-72 flex-col justify-between rounded-md space-y-5">
                    <div className="bg-gray-900 p-1 -m-2 rounded-md text-white text-center">
                        <p className="text-lg md:text-xl font-semibold">{show.name}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-md font-semibold">Language: {show.language}</p>
                        <p className="text-md font-semibold">Type: {show.type}</p>
                        <p className="text-md font-semibold">Rating: {(show.rating) ? show.rating : "No rating"}</p>
                        <p className={`text-md font-bold ${(show.status == 'Ended') ? 'text-red-600' : (show.status == 'In Development') ? 'text-yellow-600' : 'text-green-600'}`}>Status: {show.status}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between gap-2">
                    <img
                        src={show.image || "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"}
                        alt="show image"
                        className="w-28 h-40 rounded-md" />
                    <Link to={`/show/${show.id}`} className="bg-blue-500 px-5 py-2 text-white text-center rounded-md hover:bg-blue-600 transition">Book now</Link>
                </div>
            </div>
        </div>
    );
};

export default EachShowBox
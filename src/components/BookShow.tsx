import { useParams } from "react-router-dom";
import { Show } from "../utils/interface";
import { useEffect, useState } from "react";

const BookShow = () => {
    const [show, setShow] = useState<Show>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [date, setDate] = useState<string>();
    const {id} = useParams()

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
                const data = await response.json();

                const showsData: Show[] = data.map((s: any) => ({
                    id: s.show.id,
                    name: s.show.name,
                    image: s.show.image?.medium,
                    rating: s.show.rating.average,
                    language: s.show.language,
                    type: s.show.type,
                    summary: s.show.summary,
                    status: s.show.status,
                }));

                const desiredShow = showsData.find(show => show.id == id);
                setShow(desiredShow)

            } catch (error) {
                console.error("Error fetching shows:", error);
            }
        }

        fetchShows()
    }, [])

    const handleSubmit = () => {
        localStorage.setItem("name",name||"");
        localStorage.setItem("email",email||"");
        localStorage.setItem("date",date||"");
        localStorage.setItem("id",id||"");
        localStorage.setItem("show",show?.name||"");
        alert(show?.name+ " show booked for "+ date)
    }
    return (
        <div className="flex justify-center flex-col items-center mt-10">
            <h2 className="text-red-600 text-3xl md:text-5xl font-bold">Book now !!</h2>
            <div className="flex flex-wrap justify-center mt-10 md:mt-20 gap-10">
                <div className='flex justify-center flex-wrap'>
                    <div className="w-80 flex-col justify-between my-0.5 md:ml-10">
                        <p className="text-xl md:text-2xl font-bold">{show?.name}</p>
                        <div className='mt-5'>
                            <div className='font-semibold text-md' dangerouslySetInnerHTML={{ __html: show?.summary || <></> }}></div>
                        </div>
                        <div className="flex flex-col gap-1 mt-5">
                            <p className="text-xl font-bold">Language: {show?.language}</p>
                            <p className="text-xl font-bold">Rating: {(show?.rating) ? show.rating : "No rating"}</p>
                            <p className={`text-xl font-bold ${(show?.status == 'Ended') ? 'text-red-600' : (show?.status == 'In Development') ? 'text-yellow-600' : 'text-green-600'}`}>Status: {show?.status}</p>
                        </div>
                    </div>
                </div>
                <div className="w-96 mmd:w-[450px]">
                    <div className="flex flex-col py-6 gap-3 md:py-0 md:px-6">
                        <label className=" text-gray-800 pl-1">Name</label>
                        <input onChange={(e)=>{
                            setName(e.target.value)
                        }} type="text" placeholder="Enter your name" className="block w-full text-black rounded-md shadow-sm bg-zinc-100 px-3 py-3" />
                        <label className=" text-gray-800 pl-1">Email</label>
                        <input onChange={(e)=>{
                            setEmail(e.target.value)
                        }} type="email" placeholder="Enter your email" className="block w-full text-black rounded-md shadow-sm bg-zinc-100 px-3 py-3" />
                        <label className=" text-gray-800 pl-1">Date</label>
                        <input onChange={(e)=>{
                            setDate(e.target.value)
                        }} type="date" className="block w-full text-black rounded-md shadow-sm bg-zinc-100 px-3 py-3" />
                        <button type="button" onClick={handleSubmit} className="self-center mt-4 w-full bg-gray-900 text-white py-2 px-5 rounded-md hover:bg-gray-700">Book</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookShow
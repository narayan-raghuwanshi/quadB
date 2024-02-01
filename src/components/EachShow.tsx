import { useEffect, useState } from 'react'
import { Show } from '../utils/interface';
import { Link, useParams } from 'react-router-dom';

const EachShow = () => {
  const [show, setShow] = useState<Show>();
  const { id } = useParams();

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
  return (
    <div>
      <div className='flex justify-center mt-20 flex-wrap'>
        <img
          src={show?.image || "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"}
          alt="show image"
          className='w-80 rounded-md' />
        <div className="w-80 flex-col justify-between my-0.5 md:ml-10">
          <div className="bg-gray-900 p-1 rounded-md text-white text-center mt-5 md:mt-0">
            <p className="text-lg md:text-xl font-semibold">{show?.name}</p>
          </div>
          <div className='mt-5'>
            <div className='font-semibold text-md' dangerouslySetInnerHTML={{ __html: show?.summary || <></> }}></div>
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <p className="text-xl font-bold">Language: {show?.language}</p>
            <p className="text-xl font-bold">Rating: {(show?.rating) ? show.rating : "No rating"}</p>
            <p className={`text-xl font-bold ${(show?.status == 'Ended') ? 'text-red-600' : (show?.status == 'In Development') ? 'text-yellow-600' : 'text-green-600'}`}>Status: {show?.status}</p>
            <Link to={`/book/${show?.id}`} className="bg-blue-500 px-5 py-2 mt-10 md:mt-20 text-white text-center rounded-md hover:bg-blue-600 transition">Book now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EachShow
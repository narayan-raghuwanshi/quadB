import { useEffect, useState } from 'react'
import { Show } from '../utils/interface';
import EachShowBox from './EachShowBox';

const Home = () => {
    const [shows, setShows] = useState<Show[]>([]);

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

                setShows(showsData);
            } catch (error) {
                console.error("Error fetching shows:", error);
            }
        }

        fetchShows()

    }, [])
    return (
        <div>
            <div className='flex justify-center flex-col items-center mt-10 md:mt-16'>
                <h1 className='text-3xl md:text-6xl font-bold mx-3 text-center max-w-3xl text-gray-800'>Explore the whole new <span className='text-blue-500'>world</span> of cinema.</h1>
                <hr className='border-t-0 rounded-full border-dotted border-gray-200 mt-5 md:mt-10 border-8 w-16 '/>
                <div className='bg-gray-900 mt-10 md:mt-14'>
                    <div className='flex flex-wrap md:mx-20 lg:mx-40 gap-8 justify-center py-10'>
                        {shows.map((s) => (
                            <EachShowBox key={s.id} show={s} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
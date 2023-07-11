import { useState } from "react";
import TableRow from "../Components/TableRow";




const Home = () => {
    // Initialize shortenedURLsArray with data from local storage or empty array
    var shortenedURLsArray = JSON.parse(localStorage.getItem("shortenedURLs")) || [];

    const [data, setData] = useState(shortenedURLsArray);

    const [longURL, setLongURL] = useState("")


    const HandleClick = async () => {


        const result = await fetch(`https://api.shrtco.de/v2/shorten?url=${longURL}`)
        const data = await result.json()
        const shortURL = data?.result?.short_link2;

        var entry = {
            longURL,
            shortURL
        };

        shortenedURLsArray.push(entry);
        localStorage.setItem("shortenedURLs", JSON.stringify(shortenedURLsArray));
        setData([...shortenedURLsArray]);
    }

    function removeItem(index) {
        shortenedURLsArray.splice(index, 1);
        localStorage.setItem("shortenedURLs", JSON.stringify(shortenedURLsArray));
        setData(shortenedURLsArray)

    }


    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col w-[500px] h-[200px] mx-auto items-center justify-center ">
                <input onBlur={(e) => setLongURL(e?.target?.value)} className=" p-2 border border-blue-200 focus:border-blue-300 rounded-lg w-full " type="text" placeholder="Your Long URL" id="" />
                <button className="bg-sky-200 px-4 py-2 rounded-lg  mt-4  " onClick={HandleClick}>ShortLink</button>
            </div>



            <table className="min-w-full">
                <thead>

                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">

                        <th className="px-6 py-3 text-left font-medium">
                            LongURL
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                            shortURL
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                            action
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                            Edit Page
                        </th>

                    </tr>
                </thead>
                <tbody className="bg-white">
                    {/* Data Show In Table */}

                    {
                        data.map((item, ind) => <TableRow key={ind} removeItem={removeItem} item={item} />)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default Home;
import { useRef } from "react";
import { Link } from "react-router-dom";



const TableRow = ({ item, removeItem, id }) => {
    const textRef = useRef(null);

    const handleCopyClick = async () => {
        const textToCopy = textRef.current.innerText;
        // const tempTextArea = document.createElement('textarea');
        // tempTextArea.value = textToCopy;
        // document.body.appendChild(tempTextArea);
        // tempTextArea.select();
        // document.execCommand('copy');
        // document.body.removeChild(tempTextArea);
        // alert('Text copied to clipboard!');
        try {
            await navigator.clipboard.writeText(textToCopy);
            alert('Text copied to clipboard!');
        } catch (error) {
            console.error('Unable to copy text:', error);
        }
    };



    return (
        <tr className="hover:bg-gray-50">

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    {item?.longURL}
                </div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div ref={textRef} className="text-sm leading-5 text-gray-900">
                    {item?.shortURL}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap  border-b border-gray-200 text-sm leading-5 font-medium">
                <button className="bg-slate-100 px-4 py-2 rounded-md" onClick={handleCopyClick}>CopyURL</button>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap  border-b border-gray-200 text-sm leading-5 font-medium">
                <button className="bg-slate-100 px-4 py-2 rounded-md" onClick={() => removeItem(id)}>Delete</button>
            </td>
        </tr>
    );
};

export default TableRow;
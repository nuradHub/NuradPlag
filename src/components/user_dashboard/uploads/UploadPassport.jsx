import { Cloud } from "lucide-react"
import { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import { toast } from "react-toastify";
import axios from "axios";

const UploadPassport = () => {

  const {setIsUpload, isLoading, setIsLoading} = useContext(AppContext)

  const [fileSize, setFileSize] = useState(false)
  const [fileType, setFileType] = useState(false)
  const [fileString, setFileString] = useState(null)
  const [fileName, setFileName] = useState('')

  const getPassportFile = (e) => {

    const file = e.target.files[0];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB limit

    if (file.size > MAX_SIZE) {
      e.target.value = null; // Clear the input
      setFileSize(true)
      setTimeout(()=> {setFileSize(false)}, 2000)
      return;
    }

    if (!file.type.startsWith('image/') || file.type === 'image/gif') {
      e.target.value = null;
      setFileType(true);
      setTimeout(()=> {setFileType(false)}, 2000)
      return;
    }

    setFileName(file.name)

    // Only read the file if it passes the size check
    const reader = new FileReader();
    reader.onloadend = () => setFileString(reader.result);
    reader.readAsDataURL(file);
  }

  const updatePassport = async ()=> {
    setIsLoading(true)
    try{
      const response = await axios.put('/upload/passport', {
        passport: fileString
      })
      toast.success(response?.data?.message)
      setTimeout(()=> {window.location.reload()},2000)
    }catch(err){
      console.log(err)
      toast.error(err?.response?.data?.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0  w-full h-full bg-black/10 z-5">
      <div className="flex flex-col bg-white p-4 gap-7 rounded-xl w-80 md:w-130">
        <h3 className="text-md font-medium">Upload Passport</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center border-2 border-dotted border-blue-500  h-30">
            <Cloud className="text-blue-600" size={20} />
            <label htmlFor="file" className="text-sm font-medium">Drag & Drop your or <span className="text-blue-600 underline cursor-pointer">Browse</span></label>
            <input type="file" id='file' name='file' hidden onChange={getPassportFile} />
            {fileSize && <p className="text-[10px] text-red-500">file size must not be greater than 5MB</p>}
            {fileType && <p className="text-[10px] text-red-500">Supported formats: PNG, JPG, JPEG</p>}
            <p className="text-[14px] text-green-400">{fileName && fileName}</p>
          </div>
          <div className="flex items-center justify-between text-xs ">
            <p>Support formats: PNG, JPG, JPEG</p>
            <span>Maximum size: <b>5MB</b></span>
          </div>
          <div className="flex items-center justify-center md:items-end md:justify-end gap-5">
            <button type="submit" className="w-30 " onClick={updatePassport} >
              {isLoading ?
              <div className='flex items-center justify-center bg-blue-500 text-white p-1 font-bold rounded hover:bg-slate-800  cursor-pointer '>
                <img src="/img/loading.gif" className='w-6' />
              </div>: <div className='flex items-center justify-center bg-blue-500 text-white p-1 font-bold rounded hover:bg-blue-600 w-30 cursor-pointer '>
                Upload
              </div> }
            </button>
            <button type="button" className="flex items-center justify-center bg-slate-200 text-black p-1 font-bold rounded w-30 hover:bg-slate-300 cursor-pointer " onClick={()=> setIsUpload(false)} >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UploadPassport
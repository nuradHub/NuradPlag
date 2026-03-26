import { createContext, useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { toast } from "react-toastify"

export const AppContext = createContext()

const ContextProvider = ({ children }) => {

  const [isMenu, setIsMenu] = useState(false)
  const [isAsideMenu, setIsAsideMenu] = useState(false)
  const [folder, setFolder] = useState('my-scan')
  const [isFolder, setIsFolder] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState('')
  const [selectedMenu, setSelectedMenu] = useState('new-scan')
  const [selectedProfile, setSelectedProfile] = useState('profile')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [city, setCity] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isEditAccount, setIsEditAccount] = useState(false)
  const [isEditBilling, setIsEditBilling] = useState(false)
  const [isEditEmail, setIsEditEmail] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [userId, setUserId] = useState('')
  const [isUpload, setIsUpload] = useState(false)
  const [isUpdatePassword, setIsUpdatePassword] = useState(false)
  const [currentMenu, setCurrentMenu] = useState('text');
  const [detectPlagiarism, setDetectPlagiarism] = useState(true);
  const [detectAi, setDetectAi] = useState(true);
  const [viewMode, setViewMode] = useState(true);
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [sharedFile, setSharedFile] = useState([]);
  const [textLength, setTextLenght] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([])
  const [report, setReport] = useState(null)
  const [adminProject, setAdminProject] = useState([])
  const [approved, setApproved] = useState([])
  const [rejected, setRejected] = useState([])
  const [isReport, setIsReport] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isApprove, setIsApprove] = useState(false)
  const [similarities, setSimilarities] = useState(false)
  const [isRejected, setIsRejected] = useState(false)
  const [isDelete, setIsDelete] = useState(false);
  const [projectId, setProjectId] = useState('');

  const getUserProfile = async () => {
    try {
      let userId
      const token = localStorage.getItem('token')
      if (token) {
        const decoded = jwtDecode(token)
        userId = decoded.userId
      }
      const response = await axios.get(`/profile/${userId}`)
      if (response) {
        setCurrentUser(response)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleAllProjects = async () => {
    try {
      const response = await axios.get('/projects')
      if (response.data) {
        let datas = response.data
        const approved = datas.filter(data => data.approved === true)
        const projects = datas.filter(data => data.approved !== true && data.rejected !== true)
        const rejected = datas.filter(data => data.rejected === true)
        setApproved(approved)
        setProjects(projects)
        setRejected(rejected)
        setSimilarities(response.data)
      }
    } catch (err) {
      console.log(err)
      console.log(err?.response?.data?.message)
    }
  }

  const projectFunction = async () => {
    try {
      const response = await axios.get('/projects/me')
      if (response.data) {
        setProjects(response.data)
      }
    } catch (err) {
      console.log(err)
      console.log(err?.response?.data?.message)
    }
  }

  const adminProjectFunction = async () => {
    try {
      const response = await axios.get('/projects/admin')
      if (response.data) {
        setAdminProject(response.data)
      }
    } catch (err) {
      console.log(err)
      console.log(err?.response?.data?.message)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        return toast.error("File is too large (Max 10MB)");
      }
      setFile(selectedFile);
      toast.success(`${selectedFile.name} attached!`);
    }
  };

  const handleExecuteScan = async () => {
    const formData = new FormData();

    if (currentMenu === 'files') {
      if (!file) return toast.error("Please upload a PDF file first");
      formData.append('file', file);
    } else if (currentMenu === 'text') {
      if (!inputText.trim()) return toast.error("Please enter some text to scan");
      formData.append('text', inputText);
    } else if (currentMenu === 'urls') {
      if (!inputUrl.trim()) return toast.error("Please enter a URL to scan");
      formData.append('url', inputUrl);
    }

    setIsScanning(true);

    try {
      const response = await axios.post('/new-scan', formData);

      if (response.data) {
        toast.success("Scan Completed Successfully!");
        //navigate(`/admin/report/${response.data._id}`); 
      }
      projectFunction();
      adminProjectFunction()
      setFile(null)
      setInputText('')
      setInputUrl(null)

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Scan failed. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const projectReportFunction = async (projectId) => {
    setIsReport(true)

    try {
      const response = await axios.put('/filter/project', {
        projectId: projectId
      })
      if (response.data) {
        return response.data
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    } finally {
      setIsReport(false)
    }
  }

  const getProjectId = (projectId) => {
    setProjectId(projectId)
  }


  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete('/delete/project', {
        data: { projectId: projectId }
      })
      if (response.data) {
        toast.success(response.data.message)
      }
      await projectFunction()
      await adminProjectFunction()
      setIsDelete(false)
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message)
    }
  }

  const values = {
    isMenu, setIsMenu,
    isAsideMenu, setIsAsideMenu,
    folder, setFolder,
    isFolder, setIsFolder,
    selectedFolder, setSelectedFolder,
    selectedMenu, setSelectedMenu,
    selectedProfile, setSelectedProfile,
    email, setEmail,
    password, setPassword,
    firstname, setFirstName,
    country, setCountry,
    address, setAddress,
    zipcode, setZipcode,
    city, setCity,
    isLoading, setIsLoading,
    showPassword, setShowPassword,
    lastname, setLastName,
    isEditAccount, setIsEditAccount,
    isEditBilling, setIsEditBilling,
    isChecked, setIsChecked,
    isEditEmail, setIsEditEmail,
    currentUser, setCurrentUser,
    userId, setUserId,
    isUpload, setIsUpload,
    isUpdatePassword, setIsUpdatePassword,
    file, setFile,
    currentMenu, setCurrentMenu,
    detectPlagiarism, setDetectPlagiarism,
    detectAi, setDetectAi,
    viewMode, setViewMode,
    inputText, setInputText,
    inputUrl, setInputUrl,
    isScanning, setIsScanning,
    sharedFile, setSharedFile,
    textLength, setTextLenght,
    getUserProfile, handleFileChange,
    handleExecuteScan,
    users, setUsers,
    projects, setProjects,
    projectFunction,
    report, setReport,
    adminProject, setAdminProject,
    adminProjectFunction,
    approved, setApproved,
    isReport, setIsReport,
    projectReportFunction,
    isReady, setIsReady,
    isApprove, setIsApprove,
    similarities, setSimilarities,
    isRejected, setIsRejected,
    handleDeleteProject,
    isDelete, setIsDelete,
    projectId, setProjectId,
    getProjectId, handleAllProjects,
    rejected
  }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
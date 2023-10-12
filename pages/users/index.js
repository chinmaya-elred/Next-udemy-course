import React, {useEffect,useState} from 'react'
import { useRouter } from 'next/router'; 
import axios from 'axios';
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination/Pagination'

const App = () =>{
  const [searchItem, setSearchItem] =useState('')
  const [pageCount, setPageCount] = useState(0)
  const [userData, setUserData] = useState([])
  const userPerPage = 10;
  const pageVisit = pageCount * userPerPage
  const router = useRouter()


  const fetchUserdata = () =>{
    return axios.get("https://randomuser.me/api/?results=100")
    .then((res) =>{
      console.log(res.data.results)
      setUserData(res.data.results)
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  useEffect (() =>{
    fetchUserdata()
  },[])



const allheader = () =>{
  const header = ['Gender', 'Email', 'Name','City', 'State', 'Picture']
  return header.map((headers,index) =>{
    return (
      <th key={index}>{headers.toUpperCase()}</th>
    )
  })
}



 const totalPageCount = Math.ceil(userData.length / userPerPage) 
 const handlePagination = ({selected}) =>{
  console.log(selected)
    setPageCount(selected)
  }

  return (
    <Layout>
     
       <input type="text" name="search" onChange={(e) =>setSearchItem(e.target.value)} style={{margin: '100px 0 0 0'}} />

       <button onClick={() => router.push('/users/newUserForm')}>New User</button>

          <div style={{  marginBottom: '100px' }}>
          
            <table className="table">
              <thead>
                <tr>{allheader()}</tr>
              </thead>

              <tbody>              
                 {userData.slice(pageVisit, pageVisit + userPerPage)
                          .filter((data) =>{
                            //console.log(data)
                             if(searchItem == "")
                                 return data
                             else if(data.email.toLowerCase().includes(searchItem.toLowerCase())){
                                 return data
                           }else if(data.name.first.toLowerCase().includes(searchItem.toLowerCase())){
                              return data
                           }
                        }).map(({gender,email,name,location,picture}) =>{
   
                    return(
                         <tr>
                         <td>{gender}</td>
                         <td>{email}</td>
                         <td>{name.first} {name.last}</td>
                         <td>{location.city}</td>
                         <td>{location.state}</td>
                         <td><img src={picture.medium} /></td>
                         </tr>
                        )
                    })
                 }
            </tbody>             
            </table>
           
           <Pagination pageCount={totalPageCount} onClick={handlePagination}/>
          </div>
        </Layout>
  );
}

export default App;

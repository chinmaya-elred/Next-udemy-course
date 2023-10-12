import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination/Pagination';

const UserList = ({ userData }) => {
  console.log(userData)
  const [searchItem, setSearchItem] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const userPerPage = 10;
  const pageVisit = pageCount * userPerPage;

  const allheader = () => {
    const header = ['Gender', 'Email', 'Name','City', 'State', 'Picture'];
    return header.map((headers, index) => {
      return (
        <th key={index}>{headers.toUpperCase()}</th>
      );
    });
  };

  const totalPageCount = Math.ceil(userData?.length / userPerPage);

  const handlePagination = ({ selected }) => {
    setPageCount(selected);
  };

  return (
    <Layout>
      <input type="text" name="search" onChange={(e) => setSearchItem(e.target.value)} style={{margin: '100px 0 0 0'}} />
      <div style={{ marginBottom: '100px' }}>
        <table className="table">
          <thead>
            <tr>{allheader()}</tr>
          </thead>
          <tbody>
            {userData?.slice(pageVisit, pageVisit + userPerPage)
              .filter((data) => {
                if (searchItem === '') return data;
                else if (data.email.toLowerCase().includes(searchItem.toLowerCase())) return data;
                else if (data.name.first.toLowerCase().includes(searchItem.toLowerCase())) return data;
              })
              .map(({ gender, email, name, location, picture }, index) => (
                <tr key={index}>
                  <td>{gender}</td>
                  <td>{email}</td>
                  <td>{`${name.first} ${name.last}`}</td>
                  <td>{location.city}</td>
                  <td>{location.state}</td>
                  <td><img src={picture.medium} alt={`user-${index}`} /></td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination pageCount={totalPageCount} onClick={handlePagination} />
      </div>
    </Layout>
  );
};


export async function getServerSideProps(context) {
  const res = await axios.get("https://randomuser.me/api/?results=200");
  const userData = res.data.results;
  return {
    props: {
      userData,
    },
  };
}

// export async function getStaticPaths() {
//   const res = await axios.get("https://randomuser.me/api/?results=100");
//   const userData = res.data.results;

//   const paths = userData.map(user => ({
//     params: { id: user.login.uuid }
//   }));

//   return { paths, fallback: false };
// }


export default UserList;

import React from 'react';
import Layout from '../../../components/Layout';

const NewUserForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('values')
  }

  return (
    <Layout>
      <div>
        <h1>New User Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}

export default NewUserForm;

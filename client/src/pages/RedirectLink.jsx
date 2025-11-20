import { api } from '@/lib/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const RedirectLink = () => {
  const { id } = useParams();
  // console.log(id)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLongUrl() {
      try {
        const res = await api.get(`/${id}`);
        console.log(res.data)
        window.location.href = res.data;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchLongUrl();
  }, [id]);  // <-- dependency array is important!

  if (loading) {
    return (
      <>
        <BarLoader width={"100%"} color='#36d7b7' />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;

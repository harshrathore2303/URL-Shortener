import React, { useEffect, useState } from 'react'
import {api} from "../lib/axios";

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    function fetchfn() {
        setLoading(true);
        async function fetchData(){
            try {
                const res = await api.get(url);
                // console.log(res)
                const data = await res.data;
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error?.response?.data?.message);
                setLoading(false);
            }
        }
        fetchData();
    };

  return {data, loading, error, fetchfn};
}

export default useFetch
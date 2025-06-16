// import  {useState} from "react";
// import { toast } from "sonner";
// const useFetch=(cb)=>{
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const fn=async(...args)=>{
//         setLoading(true);
//         setError(null);
//         try {
//             const response=await cb(...args)
//             setData(response)
//             setError(null)
//             return response
//         } catch (error) {
//             setError(error)
//             toast.error(error.message)
//         } finally {
//             setLoading(false)
//         }
//     }
//     return {data,loading,error,fn,setData}
// }

// export default useFetch


import { useState, useEffect, useRef } from "react";

export default function useFetch(fn, options = { immediate: true }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false); // avoid multiple calls on re-renders

  const wrappedFn = async (...args) => {
    setLoading(true);
    try {
      const result = await fn(...args);
      setData(result);
      return result;
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate && !hasFetched.current) {
      hasFetched.current = true;
      wrappedFn();
    }
  }, []);

  return {
    data,
    loading,
    fn: wrappedFn,
    setData,
  };
}

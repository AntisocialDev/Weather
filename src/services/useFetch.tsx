import { useEffect, useState } from "react";

const UseFetch = (url: string) => {
   const [data, setData] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const [err, setError] = useState('');

   useEffect(()=>{
    fetch(url, {
        headers: {
            
        }
    }).then((res)=>{
        if(res.status === 200){
            return res.json();
        }
        throw Error('Error fetching data!')
    }).then((data)=>{
        setData(data);
        setIsLoading(false);
    }).catch((err: Error)=>{
        setIsLoading(false);
        setError(err.message);
        console.log(err.message)
    })
   }, [url]);

   return {
    data,
    isLoading,
    err,
   }
}
 
export default UseFetch;
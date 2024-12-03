import { useEffect, useState } from "react";
import {json} from "@remix-run/server-runtime";
import { LoaderFunction } from "@remix-run/node"; 
import { useLoaderData } from "@remix-run/react"



type MyObject = {
  stamp: string;
  time: string;
};

export const loader : LoaderFunction = async ({ params }) => { 
  const timestampFromDB = "2024-12-01T12:00:00Z";  
  
  const formattedDate = new Date(timestampFromDB).toLocaleString('en-US');
  const formattedTime = new Date(timestampFromDB).toLocaleTimeString('en-US');  

  return json<MyObject>({ stamp: formattedDate, time:formattedTime});
};


export default function HydrationError() {
    const loaderData = useLoaderData<typeof loader>()
    const [stamp, setStamp] = useState("");
  
    useEffect(() => {
      setStamp(new Date(loaderData.time).toLocaleString());
    }, [loaderData.time]);
  
    return (
      <div>
        Time: 
  
        <time>{stamp}</time>
      </div>
    )
  }
  
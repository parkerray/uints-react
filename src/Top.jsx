import { useEffect, useState } from "react";
import Holder from "./Holder";


export default function Top() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    await fetch('https://main.api314.com/api:public:v1/indexed-top-holders')
      .then(response => response.json())
      .then(data => setRecords(data));
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
      <div className='section-full'>
        {isLoading ? <p>Loading...</p> :
        <div className='list-wrapper'>
          <div className='list-header'>
            <p>UINTS SUM</p>
            <p>HOLDER</p>
          </div>
          {records.map(record => (
            <Holder
              key={record.owner}
              address={record.owner}
              number={record.number}
            />
          ))}
         </div>}
      </div>
    </>
  )
}
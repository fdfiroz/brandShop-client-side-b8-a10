import { useLoaderData } from "react-router-dom"
import Card from "../../Components/Cards/Card"

const Bikes = () => {
  const dataData = useLoaderData()
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {
      dataData?.map((data) => <Card key={data._id} data={data}></Card>)
    }
    </div>
    
    </>
  )
}

export default Bikes
import { useLoaderData } from "react-router-dom"
import Card from "../../Components/Cards/Card"
import NoDataFound from "../../Components/NoDataFound/NoDataFound"
import { Helmet } from "react-helmet-async"
const Cars = () => {
  const dataData = useLoaderData()
  return (
    <>
    <Helmet>
      <title>Cars</title>
    </Helmet>
    {dataData?.length === 0 ? <NoDataFound></NoDataFound> :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {
        dataData?.map((data) => <Card key={data._id} data={data}></Card>)
      }
      </div>
    }
    
    </>
  )
}

export default Cars
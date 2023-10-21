import { useLoaderData } from "react-router-dom"
import Card from "../../Components/Cards/Card"
import AdSlider from "../../Components/AdSlider/AdSlider"
import NoDataFound from "../../Components/NoDataFound/NoDataFound"

const Brand = () => {
    const data = useLoaderData()
    console.log(data)
  return (
   <>
   <AdSlider/>
    {
        data.length === 0 ? <NoDataFound/> :
        <div>
            <h3 className="text-xl font-bold">Category By {data[0].brandName}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        {
            data.map((data) => (<Card key={data.id} data={data}/>))
        }
    </div>
        </div>
    }
    </>
  )
}

export default Brand
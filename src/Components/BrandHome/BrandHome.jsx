import { Link } from "react-router-dom";

const BrandHome = () => {
  const category = [
    {
      name: "TVS",
      id: 1,
      image: "tvs.png",
    },
    {
      name: "Bajaj",
      id: 2,
      image: "bajaj.png",
    },
    {
      name:"Hero",
      id:3,
      image:"hero.png"
    },
    {
      name:"Suzuki",
      id:4,
      image:"suzuki.png"
    },
    {
      name:"Honda",
      id:5,
      image:"honda.png"
    },
    {
      name:"Yamaha",
      id:6,
      image:"yamaha.png"
    }


  ]
  return (
    <>
    <h2 className="text-xl font-bold my-8">Bikes By Category</h2>
    <div className="grid grid-cols-3 gap-4">
      {category.map((data) => (
        <Link to={`brand/${data.name}`} className="card w-80 bg-base-100 shadow-xl border-2" key={data.id}>
          <figure>
            <img src={`/${data.image}`} alt={data.name} className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title capitalize">{data.name}</h2>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
}

export default BrandHome
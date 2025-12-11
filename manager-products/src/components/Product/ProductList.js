import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";

function ProductList(props) {
    const {reload} = props
    const [data, setData] = useState([])
    const [editReload, setEditReload] = useState(false)

    const handleReload = () => {
        setEditReload(!editReload)
    }

    useEffect(() => {
        const fetchApi = async () => {
            fetch("http://localhost:3002/products")
                .then(res => res.json())
                .then(data => {
                    setData(data.reverse())
                })
        }
        fetchApi()
    }, [reload, editReload])

    return (
        <>
            <div className="product__list">
                {data.map(item => (
                    <div className="product__item" key={item.id}>
                        <div className="product__image">
                            <img src={item.thumbnail} alt={item.title} />
                        </div>
                        <h4 className="product__title">{item.title}</h4>
                        <p className="product__price">{item.price}$</p>
                        <p className="product__percent">{item.discountPercentage}%</p>
                        <EditProduct item={item} onReload={handleReload} />
                        <button>Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductList;
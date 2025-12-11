import { useState, useEffect } from "react";
import Modal from 'react-modal'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function EditProduct(props) {

    const { item, onReload } = props
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState(item);
    const [dataCategory, setDataCategory] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            fetch("http://localhost:3002/category")
                .then(res => res.json())
                .then(data => {
                    setDataCategory(data)
                })
        }
        fetchApi()
    }, [])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [name]: value
        })
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(true);
        console.log(item)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3002/products/${item.id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setShowModal(false);
                    onReload()
                    Swal.fire({
                        icon: "success",
                        title: "Cập nhật sản phẩm thành công",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <>
            <button onClick={openModal}>+ Edit</button>

            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tiêu đề</td>
                                <td>
                                    <input type="text" name="title" onChange={handleChange} value={data.title} required />
                                </td>
                            </tr>
                            {dataCategory.length > 0 && (
                                <tr>
                                    <td>Danh mục</td>
                                    <td>
                                        <select name="category" onChange={handleChange} value={data.category}> 
                                            {dataCategory.map((item, index) => (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td>Giá</td>
                                <td>
                                    <input type="text" name="price" onChange={handleChange} value={data.price} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Giảm giá</td>
                                <td>
                                    <input type="text" name="discountPercentage" onChange={handleChange} value={data.discountPercentage} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Số lượng còn lại</td>
                                <td>
                                    <input type="text" name="stock" onChange={handleChange} value={data.stock} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Đường dẫn ảnh</td>
                                <td>
                                    <input type="text" name="thumbnail" onChange={handleChange} value={data.thumbnail} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Mô tả</td>
                                <td>
                                    <textarea rows={4} name="description" onChange={handleChange} value={data.description}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={closeModal}>Hủy</button>
                                </td>
                                <td>
                                    <input type="submit" value="Cập nhật" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal>
        </>
    )
}

export default EditProduct;
import React,{useState, useEffect} from 'react'

import Table from '../components/table/Table'

import callAPI from '../api/api'

const customerTableHead = [
    'name',
    'email',
    'phone',
    'specialize',
    'status'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        {/* <td>{item.id}</td> */}
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>class {item.class}: {item.specialize}</td>
        <td>{item.status}</td>
        {/* <td>{item.c}</td> */}
    </tr>
)

const Tutors = () => {
    const [listTutor, setListTutor] = useState();
    useEffect(() => {
        getTutor()
        return ()=>{
            setListTutor([]);
        }
    }, []);

    async function getTutor() {
        try {
          await callAPI("get", "/tutor")
            .then((res) => {
                console.log(res);
                setListTutor(res?.data.listTutor);
            })
            .catch((err) => console.log(err));
        } catch (error) {}
      }

    return (
        <div>
            <h2 className="page-header">
                Tutor
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        {listTutor && <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={listTutor}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tutors

import React, { useEffect, useState } from 'react'
import { Card, Button, Modal, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Meta } = Card;

const index = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [values, setValues] = useState<any>({
    name: '',
    surname: '',
    age: '',
    email: '',
    image: ''
});

  useEffect(() => {
    const handleGet = async () => {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
    }
    handleGet();
  }, []);

  const handleUpdate = async (id: string, values: any) => {
    await axios.patch('http://localhost:5000/users/'+ id +'', values);
  }

  const handleDelete = async (id: string) => {
    await axios.delete('http://localhost:5000/users/'+ id +'');
  }

  const handleAdd = async (values: any) => {
    await axios.post('http://localhost:5000/users/', values);
  }

  return (
    <div>
        <Button style={{marginLeft: '45%'}} onClick={() => {setAddModal(true);}} type="primary">Add User</Button>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '5%', flexWrap: 'wrap'}}>
      {
        users.map(user => 
          <Card
          key={user._id}
          hoverable
          style={{ width: 240, marginRight: '3%' }}
          cover={<img alt="example" src={user.image} />}
        >
          <Meta title={user.name + ' ' + user.surname + ' ' + user.age} description={user.email} />
          <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '10px'}}>
            <Button
                    onClick={() => {setEditModal(true); setValues(user); }}
                    type="primary"
                    icon={<EditOutlined />}
                    />
            <Button
                    style={{backgroundColor: 'red'}}
                    onClick={() => {handleDelete(user._id);}}
                    type="primary"
                    icon={<DeleteOutlined />}
                    />
          </div>

                  <Modal
                  title= {'Edit User'}
                  open={editModal}
                  onOk={() => {handleUpdate(user._id, values); setEditModal(false); }}
                  onCancel={() => {setEditModal(false);}}
                >
                  <p>Name<Input placeholder="Name" name='name' defaultValue={user.name} onChange={(e) => {setValues({...values, name: e.target.value})}} /></p>
                  <p>Surname<Input placeholder="Surname" name='surname' defaultValue={user.surname} onChange={(e) => {setValues({...values, surname: e.target.value})}} /></p>
                  <p>Age<Input placeholder="Age" name='age' type='number' defaultValue={user.age} onChange={(e) => {setValues({...values, age: e.target.value})}} /></p>
                  <p>Email<Input placeholder="Email" name='email' defaultValue={user.email} onChange={(e) => {setValues({...values, email: e.target.value})}} /></p>
                  <p>Image<Input placeholder="Image" name='image' defaultValue={user.image} onChange={(e) => {setValues({...values, image: e.target.value})}} /></p>
                </Modal>
        </Card>
          )
      }
                        <Modal
                  title= {'Add User'}
                  open={addModal}
                  onOk={() => {setAddModal(false); handleAdd(values); }}
                  onCancel={() => {setAddModal(false);}}
                >
                  <p>Name<Input placeholder="Name" name='name' onChange={(e) => {setValues({...values, name: e.target.value})}} /></p>
                  <p>Surname<Input placeholder="Surname" name='surname' onChange={(e) => {setValues({...values, surname: e.target.value})}} /></p>
                  <p>Age<Input placeholder="Age" name='age' type='number' onChange={(e) => {setValues({...values, age: e.target.value})}} /></p>
                  <p>Email<Input placeholder="Email" name='email' onChange={(e) => {setValues({...values, email: e.target.value})}} /></p>
                  <p>Image<Input placeholder="Image" name='image' onChange={(e) => {setValues({...values, image: e.target.value})}} /></p>
                </Modal>
    </div>
    </div>
  )
}

export default index
import React,{useEffect, useState} from 'react';
import { Avatar, Button ,Tooltip} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { assets} from '../../assets/assets';
import './index.css'; 
import { v4 as uuidv4 } from 'uuid';
import { addCertificateInfo, addWhilelist } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCompanyById } from '../../assets/company/company';
import { message } from 'antd';
import { getAdminAddress, getCompanyAbi, getContractAddress } from '../../data/mydata';
import {  Spin } from 'antd';
import {  Modal,Input } from 'antd';

// const company = {
//     name: 'Company A',
//     logo: 'https://via.placeholder.com/150',
//     description: "thethethethethethethethethethehethethethethethethethethethethethethethe thethethethethethethethethethetthetheth ethethethethethet hethethethet hethethethethethethethethethethethet hethethethethethethethethethethethethet hethethethethethethethethethethethethethethethethethethethethethethethethethethethethethet hethethethethethethethethethethethethethethethethethethethethethethethethethethethetheth ethethethethethethethethethethethe",
//     employees: [
//       { id: 1, name: 'Employee 1', avatar: `${assets.avatar}` },
//       { id: 2, name: 'Employee 2', avatar:  `${assets.avatar}` },
//       { id: 3, name: 'Employee 3', avatar: `${assets.avatar}` },
//       { id: 4, name: 'Employee 4', avatar: `${assets.avatar}` },
//       { id: 5, name: 'Employee 5', avatar:`${assets.avatar}` },
//       { id: 6, name: 'Employee 6', avatar: `${assets.avatar}` }
//     ]
//   };

const CompanySub = () => {
    const { companyId } = useParams(); 
    const company = getCompanyById(companyId)
    const [employees, setEmployees] = useState(company.employees);
    const [mintButton,setMintButton] = useState(false)
    const [wallButton,setWallButton] = useState(false)

    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const address = localStorage.getItem(`address`);
    const certificates = useSelector(state=>state.certificateInfo);
    const wallisetAddress = useSelector(state=>state.whilelistAddress);
    const newAddress = useSelector(state=>state.address)
    const [isSpin,setIsSpin] = useState(false)
    const [isAdminSpin,setAdminSpin] = useState(false)
    const [isAdmin,setAdmin] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue,setInputValue] = useState('')

    useEffect(() => {
        const storedCertificates = localStorage.getItem(`${address}_certificateInfo`);
        const certificates = JSON.parse(storedCertificates);
       

        if(!certificates){
            return 
        }
        if (certificates.some(cert => cert.name === company.name)) {
            console.log(`mint 已存在 ${company.name}`)
            setMintButton(true);
          } else {
            setMintButton(false);
          }
       
    }, [certificates,company.name]);
    useEffect(()=>{
        console.log(`newAddress ${newAddress} admin:${getAdminAddress()}`)
        if(newAddress.toLowerCase()===getAdminAddress().toLowerCase()){
            setAdmin(true)
        }else{
            console.log("不是管理员")
            setAdmin(false)
        }
        
    },[newAddress])
    useEffect(()=>{
        const storedWallList = localStorage.getItem(`${address}_wallist`);
        const wallList = JSON.parse(storedWallList);
        if(!wallList){
            return
        }
        if (wallList.some(cert => cert.name.toLowerCase === company.name.toLowerCase)) {
            setWallButton(true);
          } else {
            setWallButton(false);
          }
        console.log(`isAdmin ${isAdmin} wall:${wallButton}`)
    },[wallisetAddress,company.name])
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedEmployees = Array.from(employees);
        const [reorderedItem] = reorderedEmployees.splice(result.source.index, 1);
        reorderedEmployees.splice(result.destination.index, 0, reorderedItem);
    
        setEmployees(reorderedEmployees);
      };
    const mintSuccess = () => {
        messageApi.open({
          type: 'success',
          content: 'mint success',
        });
      };
      const addWhitelistSuccess = () => {
        messageApi.open({
          type: 'success',
          content: 'Add address to whitelist success',
        });
      };
    const handleMint = async () => {
        const newId = uuidv4();
        const contractAddress = getContractAddress()
        const companyAbi = getCompanyAbi()
        const AMMContract = new  window.web3.eth.Contract(companyAbi,contractAddress);
        console.log(`contract: ${AMMContract}`)
        setIsSpin(true)
        try {
            const gasEstimate = await AMMContract.methods.mintEmployeeCertificate().estimateGas({ from: address });
            await AMMContract.methods.mintEmployeeCertificate().send({ from: address, gas: gasEstimate,  gasPrice: await window.web3.eth.getGasPrice(),            });
          } catch (error) {
            console.error('Transaction failed:', error);
          }
        const certifictionInfo = {
            "id":  newId,
            "img": company.image,
            "name": company.name,
            "hidden": false
        }
        console.log("certifictionInfo: "+newId)
        dispatch(addCertificateInfo(certifictionInfo));
        setIsSpin(false)
        mintSuccess()
    }
    const commitAsyncReq = async ()=>{
        const contractAddress = getContractAddress()
        const companyAbi = getCompanyAbi()
        const AMMContract = new  window.web3.eth.Contract(companyAbi,contractAddress);
        console.log(`contract: ${AMMContract}`)
        setAdminSpin(true)
        console.log(`whitelistEmployee前: ${inputValue} - ${newAddress}`)
        const gasEstimate = await AMMContract.methods.whitelistEmployee(inputValue).estimateGas({ from: newAddress });
        console.log(`估算gas: ${gasEstimate}`)
        try {
            const gasEstimate = await AMMContract.methods.whitelistEmployee(inputValue).estimateGas({ from: newAddress });
            await AMMContract.methods.whitelistEmployee(inputValue).send({ from: newAddress, gas: gasEstimate,  gasPrice: await window.web3.eth.getGasPrice(),            });
          } catch (error) {
            console.error('Transaction failed:', error);
          }
         console.log(`whitelistEmployee后`)
        const newId = uuidv4();
        const wallInfo = {
            "id":  newId,
            "img": company.image,
            "name": company.name,
            "hidden": false
        }
        dispatch(addWhilelist(wallInfo));
        setAdminSpin(false)
        setWallButton(true)
        addWhitelistSuccess()
       }
   const handleWhiteList = ()=>{
        setIsModalOpen(true);

       
   }
   const handleOk = () => {
    setIsModalOpen(false);
    commitAsyncReq()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (event)=>{
    setInputValue(event.target.value);
  }
  return (
   <div className='company_sub_container'>
    <Modal title='Add address' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Input placeholder="please input this address"  value={inputValue} onChange={handleChange}/>

    </Modal>
    {isAdminSpin?<Spin tip="Loading...">
        <div className='company_base_info'>
            <img src={company.image} className='company_img'/>
            <span className='company_name'>{company.name}</span>
            {isAdmin?(wallButton? (<button className='company_base_hide_btn'>
            Add address to whitelist
        </button>):(<button className='company_base_btn' onClick={handleWhiteList}>
                Add address to whitelist
            </button>)): (<button className='company_base_hide_btn'>
                Add address to whitelist
            </button>)
            }
         </div>
    </Spin>:<>
    <div className='company_base_info'>
            <img src={company.image} className='company_img'/>
            <span className='company_name'>{company.name}</span>
            {isAdmin? (<button className='company_base_btn' onClick={handleWhiteList}>
                Add address to whitelist
            </button>): (<button className='company_base_hide_btn'>
                Add address to whitelist
            </button>)
            }
         </div>
    </>}
        

         {isSpin?<Spin tip="Loading...">
            <div className='company_base_description'>

            <div className="company-left">
                    {/* <Avatar size={100} src={company.logo} /> */}
                    <Tooltip title={company.description}>
                        <div className='company-description'>{company.description}</div>
                    </Tooltip>
            </div>
                
                <div className="company-right">
                        <div className='com_font'>Certificate owners</div>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="employees" direction="horizontal">
                            {(provided) => (
                            <div
                                className="employee-grid"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {employees.map((employee, index) => (
                                <Draggable key={employee.id} draggableId={employee.id.toString()} index={index}>
                                    {(provided) => (
                                    <motion.div
                                        className="employee-item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        layout
                                    >
                                        <Tooltip title={employee.name}>
                                                <Avatar size={50} src={employee.img} />
                                        </Tooltip>
                                    </motion.div>
                                    )}
                                </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                        </DragDropContext>

                    </div>
                    {contextHolder}
                    {
                        mintButton? <button className='company_base_hide_btn' >
                        Mint
                    </button>:
                    <button className='company_base_btn' onClick={handleMint}>
                    Mint
                </button>
                    }
                
         </div>
         
         </Spin>:<>
         <div className='company_base_description'>
              
            <div className="company-left">
                    {/* <Avatar size={100} src={company.logo} /> */}
                    <Tooltip title={company.description}>
                        <div className='company-description'>{company.description}</div>
                    </Tooltip>
            </div>
                
                <div className="company-right">
                        <div className='com_font'>Certificate owners</div>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="employees" direction="horizontal">
                            {(provided) => (
                            <div
                                className="employee-grid"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {employees.map((employee, index) => (
                                <Draggable key={employee.id} draggableId={employee.id.toString()} index={index}>
                                    {(provided) => (
                                    <motion.div
                                        className="employee-item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        layout
                                    >
                                        <Tooltip title={employee.name}>
                                                <Avatar size={50} src={employee.img} />
                                        </Tooltip>
                                    </motion.div>
                                    )}
                                </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                        </DragDropContext>

                    </div>
                    {contextHolder}
                    {
                        mintButton? <button className='company_base_hide_btn' >
                        Mint
                    </button>:
                    <button className='company_base_btn' onClick={handleMint}>
                    Mint
                </button>
                    }
                
         </div>
         
         </>}

         

    
   </div>
  );
};

export default CompanySub;
